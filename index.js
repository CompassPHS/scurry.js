var Hapi = require('hapi')
    , jobManager = require('./jobManager')
    , settings = require('./config/configuration').load()
    ;

var options = {
    connections:{
        //	cors:true,
        router:{
            isCaseSensitive:false,
            stripTrailingSlash:true
        }
    },
    app:{

    }
};

var server = new Hapi.Server(options);

server.connection({
    port: process.env.PORT || settings.PORT,
    routes: {
        validate: {
            options: {
                allowUnknown:true,
                stripUnknown:true,
                abortEarly: false
            }
        }
    }
});

server.ext('onRequest', function (request, reply) {
    if(!settings.serverPath) return reply.continue();

    console.log(request.path);
    var regex = new RegExp('(' + settings.serverPath + ')(/.+)', "i");
    request.setUrl(request.path.replace(regex, "$2"));
    console.log(request.path);
    return reply.continue();
});

jobManager.load(settings.jobs, { eagerSpawn: settings.eagerSpawn});

server.route(require('./routes'));

server.register({
    register: require('good'),
    options: {
        opsInterval: 1000,
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*', error: '*', ops: '*'}]
        }]
    }
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.start(function () {
            console.info('Server started at ' + server.info.uri);
        });
    }
});








