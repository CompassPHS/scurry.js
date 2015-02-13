var jayson = require('jayson')
    , jobManager = require('./jobManager')
    , _ = require('lodash')
    , settings = require('./config/configuration')
    , PORT = process.env.PORT || settings.PORT
    ;

// Start jobs workers
jobManager.load();

// Start jobs RPC
var methods = _.chain(jobManager.registry)
    .reduce(function(seed, job) {
        _.each(job.methods, function(func, name) {
            seed[job.name + '.' + name] = func;
        })
        return seed;
    }, {})
    .value();

var server = jayson.server(methods);

server.http().listen(PORT, function() {
    console.log('Service listening on port ' + PORT);
});