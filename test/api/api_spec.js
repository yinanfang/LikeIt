'use strict';

var frisby = require('frisby');
var appConfig = require('../../config/config.js');

frisby.create('Ensure we are dealing with a teapot')
  .get('http://localhost:'+appConfig.port.app.main)
    .expectStatus(200)
.toss();


// Reference: http://adndevblog.typepad.com/cloud_and_mobile/2015/05/test-rest-api-in-an-automatic-way.html
