var router        = require('express').Router();
var instagramApi  = require('instagram-node').instagram();
var request = require('request');
// var fs            = require('fs');
var Bluebird      = require('bluebird');

var appConfig = require('../config/config.js');
var logger = require('../utils/logger');
var inventoryData = require('./inventory.js');

Bluebird.promisifyAll(instagramApi);


router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/authorize-user', function (req, res) {
  instagramApi.use({
    client_id: appConfig.Instagram.clientID,
    client_secret: appConfig.Instagram.clientSecret,
  });
  res.redirect(instagramApi.get_authorization_url(appConfig.Instagram.redirectURI, {scope: ['likes', 'public_content', 'basic']}));
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

router.get('/logout', function(req, res) {
  if ( req.cookies.instaToken ) {
    res.clearCookie('instaToken');
    res.send(true);
  }
});

router.get('/isLogin', function(req, res) {
  if (!req.cookies.instaToken) {
    res.send(false);
  }
  else {
    res.send(true);
  }
});

var Sequelize = require('sequelize');
var DB = appConfig.Database;
var sequelize = new Sequelize(DB.schema, DB.username, DB.password, {
  host: DB.host,
  dialect: 'mysql',
});

var User = sequelize.define('User', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  profilePicture: Sequelize.STRING,
  token: Sequelize.STRING,
}, {
  timestamps: false,
  tableName: 'User',
});

router.get('/selfInfo', function(req, res) {
  if (!req.cookies.instaToken) {
    res.send({ret_code: 1});
  }
  else {
    User.findOne({
      where: {
        token: req.cookies.instaToken,
      },
    }).then(function(user) {
      if (user) {
        // console.log(user);
        var reply = {
          data: {
            id: user.id,
            username: user.username,
            profile_picture: user.profilePicture,
          },
        };
        console.log(reply);
        res.send(reply);
      } else{
        request('https://api.instagram.com/v1/users/self/?access_token='+req.cookies.instaToken, function(error, response, body) {
          var info = JSON.parse(body);
          User.create({
            username: info.data.username,
            profilePicture: info.data.profile_picture,
            token: req.cookies.instaToken,
          }).then(function(user){
            var reply = {
              data: {
                id: user.id,
                username: user.username,
                profile_picture: user.profilePicture,
              },
            };
            console.log(reply);
            if (!error && response.statusCode == 200) {
              res.send(body);
            } else {
              res.send(body);
            }
          });
        });
      }
    });
  }
});

router.get('/photoList', function(req, res) {
    if (!req.cookies.instaToken) {
        res.send({ret_code: 1});
    }
    else {
        //request('https://api.instagram.com/v1/users/self/media/liked?count=999&access_token='+req.cookies.instaToken,
        request('https://api.instagram.com/v1/users/2283420683/media/recent/?count=9999&access_token='+req.cookies.instaToken,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(body);
            }
        });
    }
});

router.get('/photo/:photoId', function(req, res) {
    if (!req.cookies.instaToken || req.params.photoId == "") {
        res.send({ret_code: 1});
    }
    else {
        request('https://api.instagram.com/v1/media/' + req.params.photoId + '?access_token=' + req.cookies.instaToken,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(body);
            }
        });
    }
});

router.get('/photo/:photoId/inventory', function(req, res) {
    if (!req.cookies.instaToken || req.params.photoId == "") {
        res.send({ret_code: 1});
    }
    else {
        // load item list from data
        var itemList = inventoryData[req.params.photoId];
        if ( itemList ) {
            res.send(itemList)
        }
    }
})

router.get('/likes/:photoId', function(req, res) {
    if (!req.cookies.instaToken) {
        res.send({ret_code: 1});
    }
    else {
        var url = 'https://api.instagram.com/v1/media/' + req.params.photoId + '/likes' + '?access_token=' + req.cookies.instaToken;
        console.log(url);
        //request.post('https://api.instagram.com/v1/media/' + req.params.photoId + '/likes' + '?access_token=' + req.cookies.instaToken,
        request.post({url:url, access_token:req.cookies.instaToken},
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(body);
            }
        });
    }
});

router.get('/unlikes/:photoId', function(req, res) {
    if (!req.cookies.instaToken || req.params.photoId == "") {
        res.send({ret_code: 1});
    }
    else {
        var url = 'https://api.instagram.com/v1/media/' + req.params.photoId + '/likes' + '?access_token=' + req.cookies.instaToken;
        console.log(url);
        //request.post('https://api.instagram.com/v1/media/' + req.params.photoId + '/likes' + '?access_token=' + req.cookies.instaToken,
        request.del({url:url, access_token:req.cookies.instaToken},
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(body);
            }
        });
    }
});

module.exports = router;
