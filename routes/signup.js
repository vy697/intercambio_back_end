'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js'),
    bcrypt = require('bcrypt');

//working 
router.post('/', function(req, res) {
  var post = req.body;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(post.pw, salt, function(err, hash) {
       knex('users').insert({
        name: post.name,
        email: post.email,
        pw: hash,
        city: post.city,
        description: post.description,
        age: post.age,
        photo_url: post.photo_url,
        pair: post.pair,
        group: post.group,
        online: post.online,
        lang_preference: post.lang_preference
      })
      .then(function() {
        res.send('Sign up successful!');
      })
      .catch(function(err) {
        console.log('Uh oh. Something went wrong', err);
        res.sendStatus(500);
      });
     });
   });
});




module.exports = router;
