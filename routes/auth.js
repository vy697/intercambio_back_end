'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

router.get('/', function(req, res) {
  res.send('auth route');
});





module.exports = router;
