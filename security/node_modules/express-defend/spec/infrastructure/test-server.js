var express = require('express');
var expressDefend = require('../../index');

exports.ensureStarted = function(config, readyCallback) {

    if(!this.server) {

        var app = express();

        expressDefend.blacklistCandidates = [];
        app.use(expressDefend.protect(config.expressDefendConfig)); // sytem under test
        app.get('/', function (req, res) { res.status(200).send('OK'); }); // sample endpoint

        this.server = app.listen( config.port, function() {

            // console.log('Test server running on port %d in %s mode', config.port, app.settings.env);

            if(readyCallback) {
                readyCallback();
            }
        });
    }
};

exports.close = function() {
    this.server.close();
    this.server = null;
};