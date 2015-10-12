var bunyan = require('bunyan')
  , PrettyStream = require('bunyan-prettystream')
  , prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

var opts = {
  name: 'shuttle',
  streams: [
    {
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut
    }
  ]
};

module.exports = bunyan.createLogger(opts);