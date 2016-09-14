'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

function getExchanges() {
  return knex('user_speaks_language')
    .join('languages', 'languages.id', 'user_speaks_language.language_id')
    .join('users', 'users.id', 'user_speaks_language.user_id')
    .join('user_learns_language', 'user_learns_language.user_id', 'user_speaks_language.user_id')
    //alias languages table to grab values for user_learns_language name and level
    .join('languages as l', 'l.id', 'user_learns_language.language_id')
    .select('users.id as user_id', 'users.name as user_name', 'users.email', 'users.pw', 'users.city', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'languages.level as speaks_language_level', 'user_learns_language.language_id as user_learns_language_id', 'l.name as learns_language', 'l.level as learns_language_level');
}

router.get('/', function(req, res) {
  getExchanges()
  .then(function(data) {
    console.log(data);
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  });
});


module.exports = router;
