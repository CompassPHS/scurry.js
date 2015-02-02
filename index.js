
var fs = require('fs')
	, path = require('path')
	, jobDir = path.join(__dirname, './jobs');

function getJobs(cb){
	var jobs = {};

	fs.readdir(jobDir, function(err, files){
			if(err) cb(err);

			files.forEach(function(file){			
				jobs[file] = require(path.join(jobDir, file));
			})
			
			cb(null, jobs);
	})
}

function registerJobs(jobs, eagerSpawn){
	console.log('registering jobs');
	
	var registry = {};
	
	Object.keys(jobs)
		.forEach(function(jobName){
			
			registry[jobName] = {
				name:jobName,
				job: jobs[jobName],
				children: [],
				spawn: function(){
					console.log('spawning child: ' + this.name);
					var child = this.job.spawn();
					this.children.push(child);
					
					//bind child to handlers
				}
			};
			
		});		
		
	return registry;
}

var eagerSpawn = true;

getJobs(function(err, jobs){
	if(err) console.log(err);
	
	var registry = registerJobs(jobs);
	
	Object.keys(registry)
		.forEach(function(registrationName){				
			var registration = registry[registrationName];
			console.log('checking eager spawn for ' + registration.name);
			if(eagerSpawn === true || eagerSpawn == '*' || eagerSpawn.indexOf('*') > -1 || eagerSpawn.indexOf(registration.name) > -1)
				registration.spawn();
		})
		
})