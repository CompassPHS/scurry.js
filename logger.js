
var bunyan = require('bunyan')
  , path = require('path')
  , mkdirp = require('mkdirp')
  , settings = require('./config/configuration')
  , logOpts = settings.logger
  , PrettyStream = require('bunyan-prettystream')
  , prettyStdOut = new PrettyStream()
;

var opts = {
  name: logOpts.name,
  streams: [
  ]
};

if(process.env.NODE_ENV !== 'test'){
  prettyStdOut.pipe(process.stdout);

  opts.streams.push({
    level: 'debug',
    type: 'raw',
    stream: prettyStdOut
  });

  if(logOpts.file) {
    var dir = path.dirname(logOpts.file.path);
    mkdirp.sync(dir)
    opts.streams.push(logOpts.file);
  }

  //kibana: http://cphs-eslog:5601/index.html#/dashboard/file/logstash.json
  if(logOpts.logstashTcp){
    opts.streams.push({
      type: "raw",
      level:"debug",
      stream: require('bunyan-logstash-tcp').createStream(logOpts.logstashTcp)
    })
  }
}

module.exports=bunyan.createLogger(opts);