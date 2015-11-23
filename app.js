var express       = require('express');
var exphbs        = require('express-handlebars');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var errorhandler  = require('errorhandler')
var instagram     = require('./instagram');
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
// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
// Cookie-Parser
app.use(cookieParser());
// express-handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.use(express.static('public'));

if (env == 'development') {
  app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(err.status || 500).send('Something broke!');
  });
}

/////////////////////
/// Express Routes //
/////////////////////

app.use('/', instagram);


/////////////////////
/// Express Listen //
/////////////////////
app.listen(port, function() {
  logger.info('Listening on ' + port);
});


