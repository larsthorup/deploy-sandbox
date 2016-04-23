var cryptex = require('cryptex');
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
  return executing(`echo yes | modulus project deploy --project-name ${projectName}`);
}).then(function (result) {
  console.log(result.stdout);

  process.exit(0);
}).catch(function (err) {
  console.log('Error', err);
  process.exit(1);
});