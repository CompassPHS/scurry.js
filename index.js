
function getJobs(){
	var jobs = {};

	var module = require('cpp-processor');
	
	jobs[module.name] = module;
	
	return jobs;
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

var registry = registerJobs(getJobs());
	
	Object.keys(registry)
		.forEach(function(registrationName){				
			var registration = registry[registrationName];
			console.log('checking eager spawn for ' + registration.name);
			if(eagerSpawn === true || eagerSpawn == '*' || eagerSpawn.indexOf('*') > -1 || eagerSpawn.indexOf(registration.name) > -1)
				registration.spawn();
		})