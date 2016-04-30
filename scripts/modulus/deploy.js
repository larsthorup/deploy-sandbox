var assert = require('assert');
var cryptex = require('cryptex');
var requesting = require('request-promise');
var executing = require('../executing');

var projectName = 'lars1';

cryptex.getSecret('modulus_token').then(function (token) {
  process.env.MODULUS_TOKEN = token;

  return executing(`modulus project list`);
}).then(function (result) {
  console.log(result.stdout);

  if (result.stdout.indexOf(projectName) === -1) {
    return executing(`echo yes | modulus project create ${projectName} --servo-size 512 --runtime Node.js`);
 } else {
    return {stdout: ''};
  }
}).then(function (result) {
  console.log(result.stdout);

  console.log('Deploying...');
  // ToDo: use spawn with stdio: inherit, see https://github.com/kentcdodds/cross-env/blob/master/src/index.js
  // ToDo: script: "echo yes | cryptex-env modulus_token modulus project deploy --project-name lars1"
  return executing(`echo yes | modulus project deploy --project-name ${projectName}`);
}).then(function (result) {
  console.log(result.stdout);

  return requesting({uri: 'http://lars4711.mod.bz/users', json: true});
}).then(function (users) {
  assert(users.hasOwnProperty('count'), 'Missing count property in response: ' + JSON.stringify(users));
  console.log('Verified: ', users);

  process.exit(0);
}).catch(function (err) {
  console.log('Error', err);
  process.exit(1);
});