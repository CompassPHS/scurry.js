var fs = require('fs')
  , logger = require('./logger')
  , path = require('path')
  , jobsFolder = path.join(__dirname, 'jobs')
  , _ = require('lodash')
  , registry = {}
  , logger = require('./logger');

// This will safeguard other jobs from failing jobs
process.on('uncaughtException', function(e) {
  logger.error(e);
});

function registerJobs() {
  logger.info('loading jobs');
  
  var jobs = fs.readdirSync(jobsFolder);

  jobs.forEach(function(key){

    var stats = fs.statSync(path.join(jobsFolder, key));
    if(!stats.isDirectory()) return;

    var module = require(path.join(jobsFolder,key));

    registry[key] = {
      name: key,
      job: module,
      children: [],
      spawn: function(){
        logger.info('loading job: ' + key);
        var child = this.job.spawn(logger);
        logger.info('job loaded: ' + key);

        // If child is a forked process...
        if(child != undefined && child.pid != undefined) {
          child.started = new Date();
          this.children.push(child);

          //bind child to handlers
          process.on('exit', function() {
            child.kill();
          });
        }
        
      },
      methods: module.methods
    };

  })

  return registry;
}

var load = function(){
  registerJobs();

  Object.keys(registry)
    .forEach(function(registrationName){
      var registration = registry[registrationName];
      registration.spawn();
    });
}

module.exports = {
  load:load,
  registry:registry
}
