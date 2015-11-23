var router        = require('express').Router();
var instagramApi  = require('instagram-node').instagram();
var request = require('request');
// var fs            = require('fs');
var Bluebird      = require('bluebird');

var appConfig = require('../config/config.js');
var logger = require('../utils/logger');

Bluebird.promisifyAll(instagramApi);


router.get('/', function(req, res, next) {
  if (!req.cookies.instaToken) {
    res.render('login');
  } else{
    // instagramApi.user_self_liked(function(err, medias, pagination, remaining, limit) {
    //   logger.info(medias);
    // });
    request('https://api.instagram.com/v1/users/self/media/liked?count=999&access_token='+req.cookies.instaToken, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
      }
    })
    res.render('home', {layout: 'main'});
  }
});

router.get('/authorize-user', function (req, res) {
  instagramApi.use({
    client_id: appConfig.Instagram.clientID,
    client_secret: appConfig.Instagram.clientSecret,
  });
  res.redirect(instagramApi.get_authorization_url(appConfig.Instagram.redirectURI, {scope: ['public_content', 'basic']}));
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
