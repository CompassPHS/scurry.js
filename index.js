var jayson = require('jayson')
    , jobManager = require('./jobManager')
    , _ = require('lodash')
    , settings = require('./config')
    , logger = require('./logger')
    , PORT = process.env.PORT || settings.PORT
    ;

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
    logger.debug('Service listening on port ' + PORT + ' from pid ' + process.pid);
});