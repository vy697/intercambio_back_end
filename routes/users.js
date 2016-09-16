'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

function getUser(req) {
  return knex('user_speaks_language')
    .join('languages', 'languages.id', 'user_speaks_language.language_id')
    .join('users', 'users.id', 'user_speaks_language.user_id')
    .join('user_learns_language', 'user_learns_language.user_id', 'user_speaks_language.user_id')

    .join('levels', 'levels.id', 'user_speaks_language.level_id')
    .join('levels as lev', 'lev.id', 'user_learns_language.level_id')

    //alias languages table to grab values for user_learns_language name and level
    .join('languages as l', 'l.id', 'user_learns_language.language_id')
    .select('users.id as user_id', 'users.name as user_name', 'users.email', 'users.city', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'levels.name as speaks_level_name', 'l.name as learns_language', 'lev.name as learns_level')
    .where('user_speaks_language.user_id', req.params.id);
}

router.get('/:id', function(req, res) {

  getUser(req)
  .then(function(data) {
    console.log('getUser data: ', data);
    res.json({data: data});

  })
  .catch(function(err) {
    console.log('get user error: ', err);
  });

});




module.exports = router;
