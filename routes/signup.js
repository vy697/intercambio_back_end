'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js'),
    bcrypt = require('bcrypt');

function userExists(req) {
  return knex('users').select('email').where({
    email: req.body.email
    });
  }

//working
router.post('/', function(req, res) {
  var post = req.body;

  userExists(req)
  .then(function(data) {
    console.log(data);
    if(data.length >= 1) {
      res.status(401).json({message: 'user already exists!'});
    } else {
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
            console.log('Uh oh. Not able to sign up', err);
            res.sendStatus(500);
          });
         });
       });
    }
  })
  .catch(function(err) {
    res.send('uh oh, something went wrong:', err);
    res.sendStatus(500);
  });
});




module.exports = router;
