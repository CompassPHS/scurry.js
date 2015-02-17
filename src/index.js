var jayson = require('jayson')
    , jobManager = require('./jobManager')
    , _ = require('lodash')
    , settings = require('./config/configuration')
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

server.http().listen(PORT, function() {
    console.log('Service listening on port ' + PORT);
});