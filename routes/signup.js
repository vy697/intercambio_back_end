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

router.post('/', function(req, res) {
  var post = req.body;

  userExists(req)
  .then(function(data) {
    // console.log(data);
    if(data.length >= 1) {
      res.status(401).json({message: 'user already exists!'});
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(post.pw, salt, function(err, hash) {
           return knex('users').insert({
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
          .returning('id')
          .then(function(id) {
            console.log(id);
            return knex('user_speaks_language').insert({
              user_id: Number(id),
              //form's language & level id numbers
              language_id: post.user_speaks.language_id,
              level_id: post.user_speaks.level_id
            })
            .returning('user_id')
            .then(function(user_id) {
              return knex('user_learns_language').insert({
                user_id: Number(user_id),
                language_id: post.user_learns.language_id,
                //form's language & level id numbers
                level_id: post.user_learns.level_id
              })
              .then(function() {
                res.json({message: 'Sign up successful!'});
              });
            })
            .catch(function(err) {
              console.log('Uh oh. Not able to sign up', err);
              res.sendStatus(500);
           });
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
