var registry = {}
  , path = require('path')
  , fs = require('fs')
  , pluginsFolder = path.join(__dirname, 'plugins')
  , logger = require('./logger');

var load = function(conf) {
  logger.info('registering plugins');
  var plugins = fs.readdirSync(pluginsFolder);

  plugins.forEach(function(key) {

    var stats = fs.statSync(path.join(pluginsFolder, key));
    if(!stats.isDirectory()) return;

    var module = require(path.join(pluginsFolder, key));

    module.load(conf);

  });
}

module.exports = {
  load: load
}