var executing = require('../executing');

executing(`modulus login --username ${process.env.MODULUS_USERNAME} --password ${process.env.MODULUS_PASSWORD}`).then(function (result) {
  console.log(result.stdout);

  return executing(`modulus project list`);
}).then(function (result) {
  console.log(result.stdout);

  if (result.stdout.indexOf(process.env.MODULUS_PROJECT_NAME) === -1) {
    return executing(`echo yes | modulus project create ${process.env.MODULUS_PROJECT_NAME} --servo-size 512 --runtime Node.js`);
 } else {
    return {stdout: ''};
  }
}).then(function (result) {
  console.log(result.stdout);

  return executing(`echo yes | modulus env set POSTGRESQL_CONNECTION_STRING ${process.env.POSTGRESQL_CONNECTION_STRING} --project-name ${process.env.MODULUS_PROJECT_NAME}`);
}).then(function (result) {
  console.log(result.stdout);

  console.log('Deploying...');
  return executing(`echo yes | modulus project deploy --project-name ${process.env.MODULUS_PROJECT_NAME}`);
}).then(function (result) {
  console.log(result.stdout);
  process.exit(0);
}).catch(function (err) {
  console.log('Error', err);
  process.exit(1);
});