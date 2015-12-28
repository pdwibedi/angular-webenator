var express = require('express');
var http  = require('http');
var config = require('./config');
var setup = require('./setup');

// create app instance
var app = express();

setup.views(app);
setup.logger(app);
setup.client(app);
setup.parser(app);
setup.router(app);
setup.errorHandler(app);
setup.locals(app);
start(app); // start server

function start(app){
    //setup port
    var port  = process.env.port || config.port;
    app.set('port', port);

    //create HTTP server
    var server = http.createServer(app);
    server.listen(port);
    console.log("listening on port:" + port);
};