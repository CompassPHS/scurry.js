var registry = {};

function registerJobs(jobConfigs){
    console.log('registering jobs');

    Object.keys(jobConfigs)
        .forEach(function(key){
            var module = require(key);

            registry[key] = {
                name:module.name,
                job: module,
                children: [],
                spawn: function(){
                    console.log('spawning child: ' + this.name);
                    var child = this.job.spawn();
                    child.started = new Date();
                    this.children.push(child);

                    //bind child to handlers
                },
                routes:module.routes
            };

        })

    return registry;
}

var load = function(jobConfigs, opts){
    var eagerSpawn = opts.eagerSpawn;

    registerJobs(jobConfigs);

    Object.keys(registry)
        .forEach(function(registrationName){
            var registration = registry[registrationName];

            console.log('checking eager spawn for ' + registration.name);
            if(eagerSpawn === true || eagerSpawn == '*' || eagerSpawn.indexOf('*') > -1 || eagerSpawn.indexOf(registration.name) > -1)
                registration.spawn();
        })
}

module.exports = {
    load:load,
    registry:registry
}
