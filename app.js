var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var errorhandler = require('errorhandler')
// var instagram     = require('./instagram');
var app           = express();

var appConfig = require('./config/config.js');
var logger = require('./utils/logger');
var API = require('./api/v1.0');
var port = appConfig.port.app.main;
var env = process.env.NODE_ENV;

///////////////////////////////////////////
/// Express Middleware                   //
///////////////////////////////////////////
logger.info('configuring express....');

// Overriding Express logger with Morgan //
app.use(require('morgan')('combined', { 'stream': logger.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (env == 'development') {
  app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(err.status || 500).send('Something broke!');
  });
}

/////////////////////
/// Express Routes //
/////////////////////

// app.use('/', instagram);

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World. It\'s different. Testing logs...');
  res.end();
});



/////////////////////
/// Express Listen //
/////////////////////
app.listen(port, function() {
  logger.info('Listening on ' + port);
});


