var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var appRouter = require('./routes/app.routes');
var userRouter = require('./routes/user.routes');
var config = require('./config');

module.exports.views = function(app) {
    // setup views
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
};

module.exports.logger = function(app){
    // attach middleware
    app.use(logger('dev')); // set log mode to dev defualt
};

module.exports.parser = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
};

module.exports.client = function(app) {
    // client setup
    app.use(express.static(path.join(__dirname, '../', 'client')));
};

module.exports.router = function(app) {
    // routes config
    app.use('/', appRouter);
    app.use('/api/user', userRouter);
};

module.exports.errorHandler = function(app) {
    // handle errors
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};

// setup local variable will be accessible across the app including views
module.exports.locals = function(app){
    app.locals.assets = config.client.assets;
}
