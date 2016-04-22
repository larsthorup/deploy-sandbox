function promisify (fn) {
  return function () {
    var self = this;
    var args = Array.prototype.concat.apply([], arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err, data) {
        if (err) { reject(err); } else { resolve(data); }
      });
      fn.apply(self, args);
    });
  }
}

var commander = require('commander-plus');
commander.parse = function () {
  // Note: Disable this: lib/controller/project loads lib/modulus which parses command line args
}
var userConfig = require('modulus/lib/common/api').userConfig;
var userController = require('modulus/lib/controllers/user');
userController.authenticating = promisify(userController.authenticate);
var imageController = require('modulus/lib/controllers/images');
imageController.gettingAll = promisify(imageController.getAll);
var projectController = require('modulus/lib/controllers/project');
projectController.finding = promisify(projectController.find);
projectController.creating = promisify(projectController.create);
projectController.deploying = promisify(projectController.deploy);

var imageTagIds;

// Auth
userController.authenticating(process.env.MODULUS_USERNAME, process.env.MODULUS_PASSWORD).then(function (u) {
  userConfig.load();
  userConfig.save(Object.assign(userConfig.data || {}, {
    username: u.username,
    userId: u.id,
    apiKey: u.authToken
  }));
  console.log('Authenticated as', u.username);
}).then(function () {

  // image list lookup
  return imageController.gettingAll();
}).then(function (images) {
  imageTagIds = {};
  imageTagIds.run = images.find(function (image) { return image.label === 'Node.js' && image.type === 'run'; });
  imageTagIds.build = images.find(function (image) { return image.label === 'Node.js' && image.type === 'build'; });


  // project lookup
  return projectController.finding({userId: userConfig.data.userId});
}).then(function (projects) {
  var project = projects.find(function (project) { return project.name === process.env.MODULUS_PROJECT_NAME;});
  if (project) {
    return project;
  } else {

    // project creation
    var name = process.env.MODULUS_PROJECT_NAME;
    var servoSize = 512;
    return projectController.creating(name, userConfig.data.userId, servoSize, imageTagIds);
  }
}).then(function (project) {
  console.log('Project identified as', project.domain);

  // project deploy
  var dir = process.cwd();
  var includeModules = false;
  var registry = null;
  var withTests = false;
  return projectController.deploying(project.id, dir, includeModules, registry, withTests);

  // error handling
}).catch(function (err) {
  console.log('Error', err);
});
