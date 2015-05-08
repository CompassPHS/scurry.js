var bunyan = require('bunyan')
  , settings = require('./config')
  , logOpts = settings.logger;

var opts = {
  name: logOpts.name,
  streams: []
};

if(process.env.ENV !== 'test') {
  opts.streams.push({
    stream: process.stdout,
    level: 'debug'
  });

  if(logOpts.logstashTcp) {
    opts.streams.push({
      type: 'raw',
      level: 'debug',
      stream: require('bunyan-logstash-tcp').createStream(logOpts.logstashTcp)
    })
  }
}

module.exports = bunyan.createLogger(opts);