var appConfig = require('./config/config.js');

var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello World. It\'s different. Merged with Github_....test github');
  response.end();
}).listen(appConfig.port.app.main);
