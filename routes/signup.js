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

function getCityId(req) {
  return knex('city_translations').select('city_id').where({
    display_name: req.body.city
  });
}

router.post('/', function(req, res) {
  var post = req.body;

  userExists(req)
  .then(function(data) {
    if(data.length >= 1) {
      res.status(401).json({message: 'user already exists!'});
    } else {
      getCityId(req)
      .then(function(data) {
      //console.log(data[0].city_id);
       var city_id = data[0].city_id;
       bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(post.pw, salt, function(err, hash) {
           return knex('users').insert({
            name: post.name,
            email: post.email,
            pw: hash,
            //cities come back from form as translated display_name (in any given language). This grabs id and compares it
            //against what is in city_translations table and grabs city_id to insert into user table with the rest of their info
            city_id: city_id,
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
              //form's language & level id numbers
              language_id: post.user_learns.language_id,
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
     });
    }
  })
  .catch(function(err) {
    res.json({error_message: 'uh oh, something went wrong:' + err});
    res.sendStatus(500);
  });
});




module.exports = router;
