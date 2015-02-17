var fs = require('fs')
    , path = require('path')
    , settings = require('./config/configuration')
    , jobsFolder = path.join(__dirname, 'jobs')
    , registry = {}
;

function registerJobs(){
    console.log('registering jobs');

    var jobs = fs.readdirSync(jobsFolder);

    jobs.forEach(function(key){

        var stats = fs.statSync(path.join(jobsFolder, key));
        if(!stats.isDirectory()) return;

        var module = require(path.join(jobsFolder,key));

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
            methods:module.methods
        };

    })

    return registry;
}

var load = function(){
    var eagerSpawn = settings.eagerSpawn;

    registerJobs();

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
