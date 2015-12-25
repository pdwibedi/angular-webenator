var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var routes = require('./routes/app.routes');
var apiRoutes = require('./routes/api.routes');
var server = require('./server');

// create app instance
var app = express();

// setup views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// attach middleware
app.use(logger('dev')); // set log mode to dev
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// client setup
app.use(express.static(path.join('../', __dirname, 'client')));

// routes config
app.use('/', routes);
app.use('/api', apiRoutes);

// handle errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// initialize server
server.init(app);
// start the server
server.start(app);

