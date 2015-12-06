'use strict';

var mainPort = process.env.PORT || 28096;
var domain = (process.env.NODE_ENV=='development') ? 'localhost:'+mainPort : 'likeit.yinanfang.webfactional.com';
var protocol = 'http';

var appConfig = {
  // Development vs Production
  isDebug: process.env.IS_DEBUG || true,

  JWTSecret: process.env.JWT_SECRET || '1NZtMZo8Y45RnzJS6CfViEwI1dwpwc',

  Database: {
    host: 'web404.webfaction.com',
    port: 3306,
    schema: 'likeit',
    username: 'likeit',
    password: '123456',
  },

  path: {
    app: '/',
    api: 'api/**/*.js',
    test: {
      module: 'test/module/*.js',
      api: 'test/api/*.js',
    },
  },

  port: {
    karma: {
      webServer: 9876,
    },
    app: {
      main: mainPort,
    },
    BrowserSync: {
      browser: 4000,
    },
  },

  constant: {
    BrowserSyncReloadDelay: 2000, // Make it higher when the app grows
  },

  CodeClimateRepoToken: '698fab2a9bc7f2ba22860aebbeeb1263cbb6ef9dbff2b2086a821414baeeba81',

  Loggly: {
    token: 'f82a4e7c-c829-43c7-b52d-320de7b84f7e',
  },

  Instagram: {
    username: 'liketobuyit',
    password: 'finalsucks',
    redirectURI: protocol+'://'+domain+'/handleauth',
    clientID: '2061f892320f4c188ccbf1c166b47b91',
    clientSecret: 'b1b59b1daf704d44a188e82225e88bb9'
  }
};

module.exports = appConfig;


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
// };
