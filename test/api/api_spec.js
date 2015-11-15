'use strict';

var frisby = require('frisby');
var appConfig = require('../../config/config.js');

frisby.create('Ensure we are dealing with a teapot')
  .get('http://localhost:'+appConfig.port.app.main)
    .expectStatus(200)
.toss();

