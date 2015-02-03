var jobManager = require('./jobManager')

var routes = [];

routes.push({
    path:'/{job}',
    method:'GET',
    handler:function(request,reply) {
        jobManager.registry[request.params.job]
            .routes
            .find(request.query, function (err, result) {
                reply(err)
            })
    }
})

routes.push({
    path:'/{job}/{id}',
    method:'get',
    handler:function(request,reply){
        jobManager.registry[request.params.job]
            .routes
            .get(request.params.id, function(err, result){
                reply(err)
            })
    }
})

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


module.exports = routes;