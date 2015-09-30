var fs = require( 'fs' )
  , path  = require( 'path' )
  , nconf = require( 'nconf' );

var settingsFile = path.join(__dirname, 'settings.json');

nconf.file(settingsFile);

module.exports = nconf.load();