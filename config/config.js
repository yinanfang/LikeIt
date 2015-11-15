'use strict';

var isDebug = process.env.IS_DEBUG || true;

module.exports = {
  // Development vs Production
  isDebug: isDebug,

  JWTSecret: process.env.JWT_SECRET || '1NZtMZo8Y45RnzJS6CfViEwI1dwpwc',

  path: {
    app: [''],
    api: ['api/**/*'],
    test: {
      module: ['test/module/*.js'],
      api: ['test/api/*.js'],
    },
  },

  port: {
    karma: {
      webServer: 9876,
    },
    app: {
      main: 28096,
    },
    BrowserSync: {
      browser: 4000,
    },
  },

  constant: {
    BrowserSyncReloadDelay: 500,
  },

/*
var currentEnv = process.env.NODE_ENV || 'development';
exports.appName = "MyApp";
exports.env = {
  production: false,
  staging: false,
  test: false,
  development: false
};
exports.env[currentEnv] = true;
exports.log = {
  path: __dirname + "/var/log/app_#{currentEnv}.log"
};
exports.server = {
  port: 9600,
  // In staging and production, listen loopback. nginx listens on the network.
  ip: '127.0.0.1'
};
if (currentEnv != 'production' && currentEnv != 'staging') {
  exports.enableTests = true;
  // Listen on all IPs in dev/test (for testing from other machines)
  exports.server.ip = '0.0.0.0';
};

NODE_ENV=dev node you_app.js


 */



  // Production: {
  //   DB: {
  //     Type: 'mysql',
  //     Host: 'web404.webfaction.com',
  //     Name: 'dbdcapital',
  //     User: 'dbdcapital',
  //     Password: '123456',
  //     Charset: 'utf8',
  //   },
  // },
  // Development: {
  //   DB: {
  //     Type: 'mysql',
  //     Host: 'web404.webfaction.com',
  //     Name: 'dbdcapital_dev',
  //     User: 'dbdcapital',
  //     Password: '123456',
  //     Charset: 'utf8',
  //   },
  // },



  // app: {
  //   name: 'MEAN - A Modern Stack - Production'
  // },
  // emailFrom: 'yinanfang@gmail.com',
  // mailer: {
  //   service: 'SERVICE_PROVIDER',
  //   auth: {
  //     user: 'EMAIL_ID',
  //     pass: 'PASSWORD',
  //   },
  // },
  // secret: 'SOME_TOKEN_SECRET',
  // logging: {
  //   format: 'combined',
  // },
  // strategies: {
  //   local: {
  //     enabled: true,
  //   },
  //   facebook: {
  //     clientID: 'APP_ID',
  //     clientSecret: 'APP_SECRET',
  //     callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
  //     enabled: false,
  //   },
  //   twitter: {
  //     clientID: 'CONSUMER_KEY',
  //     clientSecret: 'CONSUMER_SECRET',
  //     callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
  //     enabled: false,
  //   },
  //   github: {
  //     clientID: 'APP_ID',
  //     clientSecret: 'APP_SECRET',
  //     callbackURL: 'http://localhost:3000/api/auth/github/callback',
  //     enabled: false,
  //   },
  //   google: {
  //     clientID: 'APP_ID',
  //     clientSecret: 'APP_SECRET',
  //     callbackURL: 'http://localhost:3000/api/auth/google/callback',
  //     enabled: false,
  //   },
  //   linkedin: {
  //     clientID: 'API_KEY',
  //     clientSecret: 'SECRET_KEY',
  //     callbackURL: 'http://localhost:3000/api/auth/linkedin/callback',
  //     enabled: false,
  //   },
  // },
};
