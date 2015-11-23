// Reference: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

var path = require('path');
var winston = require('winston');
require('winston-loggly');

var appConfig = require('../config/config.js');

winston.emitErrs = true;
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: path.join(__dirname, 'logs/winston-logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new winston.transports.Loggly({
      level: 'info',
      inputToken: appConfig.Loggly.token,
      subdomain: "yinanfang",
      tags: ["LikeIt"],
      json:true
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  },
};
