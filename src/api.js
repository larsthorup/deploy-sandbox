var restify = require('restify');
var Knex = require('knex');

function userHandler (req, res, next) {
  var knex = Knex({
    client: 'pg',
    connection: process.env.POSTGRESQL_CONNECTION_STRING || 'postgres://postgres:postgres@localhost:5432/lars',
  });
  knex('user').count('* as userCount').then(function (result) {
    if(result.length < 1) {
      return 0;
    } else {
      return result[0].userCount;
    }
  }).then(function (count) {
    res.send({count: count});
  }).catch(function (err) {
    res.send(500, err);
  });
}

function serving () {
  return new Promise(function (resolve) {
    // ToDo: verify db schema version
    var server = restify.createServer();
    server.pre(restify.CORS());
    server.get('/users', userHandler);
    server.listen(1719, function () {
      resolve(server);
    });
  });
}

module.exports = {
  serving: serving
};