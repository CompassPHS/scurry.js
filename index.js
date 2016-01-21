var jayson = require('jayson')
  , jobManager = require('./jobManager')
  , pluginManager = require('./pluginManager')
  , _ = require('lodash')
  , logger = require('./logger')
  , PORT = process.env.PORT || 5000;

// Load plugins
pluginManager.load({
  logger: logger
});

// Start jobs workers
jobManager.load();

// Start jobs RPC
var methods = _.reduce(jobManager.registry, function(seed, job) {
    _.each(job.methods, function(func, methodName) {
      seed[job.name + '.' + methodName] = func;
    })
    return seed;
  }, {});

var server = jayson.server(methods);

server.on('request', function(req) {
  logger.debug(req);
});

server.on('response', function(req, res) {
  logger.debug(res);
});

server.http().listen(PORT, function() {
  logger.info('Service listening on port ' + PORT);
});