var router        = require('express').Router();
var instagramApi  = require('instagram-node').instagram();
// var fs            = require('fs');
var Bluebird      = require('bluebird');

var appConfig = require('../config/config.js');
var logger = require('../utils/logger');

Bluebird.promisifyAll(instagramApi);


router.get('/', function(req, res, next) {
  if (!req.cookies.instaToken) {
    res.render('login');
  } else{
    res.render('home', {layout: 'main'});
  }
});

router.get('/authorize-user', function (req, res) {
  instagramApi.use({
    client_id: appConfig.Instagram.clientID,
    client_secret: appConfig.Instagram.clientSecret,
  });
  res.redirect(instagramApi.get_authorization_url(appConfig.Instagram.redirectURI));
});

router.get('/handleauth', function (req, res) {
  instagramApi.authorize_userAsync(req.query.code, appConfig.Instagram.redirectURI)
  .then(function (result) {
    res.cookie('instaToken',result.access_token, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  })
  .catch(function (errors) {
    console.log(errors);
  });
});


module.exports = router;
