'use strict';

var fs    = require( 'fs' );
var path  = require( 'path' );
var nconf = require( 'nconf' );

var settingsFile = path.join(__dirname, 'settings.json');

/*
 * By chaining the .file() and .env() initialization calls you can set the
 * proiority for which location is used. In the code below the config variable
 * will be set to what is in the settings.json file if it exists and if it
 * does not exist then the environment variable will be used.
 */

nconf.file(settingsFile)
    .env(['PORT']);

module.exports = nconf.load();