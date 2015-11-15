'use strict';

var frisby = require('frisby');

frisby.create('Ensure we are dealing with a teapot')
  .get('http://localhost:4000')
    .expectStatus(200)
.toss();

