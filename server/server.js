var http  = requires('http');
var config = requires('./config');

module.exports.start = function(app){
    //setup port
    var port  = process.env.port || 3000;
    app.set('port', port);

    //create HTTP server
    var server = http.createServer(app);
    server.listen(port);
};

module.exports.init = function(app){
  //initialize app locals
  app.locals.assets = config.assets;
};