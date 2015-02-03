var jobManager = require('./jobManager')
    _ = require('lodash')
;

var routes = [];

routes.push({
    path:'/{job}',
    method:'GET',
    handler:function(request,reply) {
        var job = jobManager.registry[request.params.job];

        reply({
            id:request.params.job,
            name:job.name,
            children:job.children.map(function(child){return child.pid;})
        })
    }
})

routes.push({
    path:'/{job}/{id}',
    method:'get',
    handler:function(request,reply){
        var job = jobManager.registry[request.params.job];

        var child = _.find(job.children, {'pid':parseInt(request.params.id)});

        reply({
            id:child.pid,
            started:child.started
        })
    }
})

/*
routes.push({
    path:'/{job}',
    method:'post',
    handler:function(request,reply){
        jobManager.registry[request.params.job]
            .routes
            .create(request.payload, function(err, result){
                reply(err)
            })
    }
})
*/


module.exports = routes;