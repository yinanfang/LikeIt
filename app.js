var appConfig = require('./config/config.js');
var logger = require('./utils/logger');
var express = require('express');
var app = express();

var port = process.env.PORT || appConfig.port.app.main;

logger.info('configuring express....');

logger.debug('Overriding Express logger');
app.use(require('morgan')({ 'stream': logger.stream }));

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World. It\'s different. Testing logs...');
  res.end();
});

app.listen(port, function() {
  logger.info('Listening on ' + port);
});


