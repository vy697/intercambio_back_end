'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

function getAllExchanges() {
  return knex('user_speaks_language')
    .join('languages', 'languages.id', 'user_speaks_language.language_id')
    .join('users', 'users.id', 'user_speaks_language.user_id')
    .join('user_learns_language', 'user_learns_language.user_id', 'user_speaks_language.user_id')
    .join('levels', 'levels.id', 'user_speaks_language.level_id')
    .join('levels as lev', 'lev.id', 'user_learns_language.level_id')
    //alias languages table to grab values for user_learns_language name and level
    .join('languages as l', 'l.id', 'user_learns_language.language_id')
    .select('users.id as user_id', 'users.name as user_name', 'users.email', 'users.pw', 'users.city', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'levels.name as speaks_level_name', 'l.name as learns_language', 'lev.name as learns_level');
}

router.get('/', function(req, res) {
  getAllExchanges()
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

function findMatches(req) {
  return knex('user_speaks_language')
  .join('languages', 'languages.id', 'user_speaks_language.language_id')
  .join('users', 'users.id', 'user_speaks_language.user_id')
  .join('user_learns_language', 'user_learns_language.user_id', 'user_speaks_language.user_id')
  .join('levels', 'levels.id', 'user_speaks_language.level_id')
  .join('levels as lev', 'lev.id', 'user_learns_language.level_id')
  //alias languages table to grab values for user_learns_language name and level
  .join('languages as l', 'l.id', 'user_learns_language.language_id')
  .select('users.id as user_id', 'users.name as user_name', 'users.email', 'users.pw', 'users.city', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'levels.name as speaks_level_name', 'l.name as learns_language', 'lev.name as learns_level')
  .where('user_learns_language.language_id', req.query.i_speak)
  .andWhere('user_speaks_language.language_id', req.query.i_learn)
  .andWhere('users.city', req.query.city);
}

router.get('/results', function(req, res) {
  findMatches(req)
  .then(function(data) {
    if(data.length === 0) {
      res.json({message: 'no matches were found'});
    } else {
      res.json(data);  
    }
  })
  .catch(function(err) {
    res.status(500).json({
      err: err
    });
  });
});


module.exports = router;
