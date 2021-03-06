'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

function userExists(req) {
  return knex('users').select('email', 'pw', 'id', 'lang_preference', 'name').where({
      email: req.body.email
    });
}

router.post('/', function(req, res) {

  var user = {
    email: req.body.email
  };

  userExists(req)
  .then(function(data) {
    console.log(data);
    //if userExists returns nothing, email of user is not in the database
    if(data.length === 0) {
      res.status(401).json({message: 'user not found'});
      res.end();
      //email of user is found and we proceed to compare the hashed passwords
    } else {
      //grab user's id from knex statement in userExists function
      user.id = data[0].id;
      user.lang_preference = data[0].lang_preference;
      user.name = data[0].name;
      bcrypt.compare(req.body.pw, data[0].pw, function(err, result) {
        //if there's no result, the passwords didn't match
        if(!result) {

          res.status(401).json({message: 'incorrect password'});

          //if the pw's matched, create the payload for the jwt
        } else {

          console.log('passwords matched');

          var profile = {
            id: user.id,
            email: user.email,
            lang_preference: user.lang_preference,
            name: user.name
          };

          // We are sending the profile inside the token
          var token = jwt.sign(profile, process.env.SECRET);
          
          res.status(200).json({
            token: token,
            profile: profile
          });

          console.log('JWT Profile: ', profile);
          res.end();
        }
      });
    }
  })
  .catch(function(err) {
    console.log('login server error: ', err);
  });
});





module.exports = router;
