'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

// function getAllExchanges() {
//   return knex('user_speaks_language')
//     .join('languages', 'languages.id', 'user_speaks_language.language_id')
//     .join('users', 'users.id', 'user_speaks_language.user_id')
//     .join('cities', 'users.city_id', 'cities.id')
//     .join('user_learns_language', 'user_learns_language.user_id', 'user_speaks_language.user_id')
//     .join('levels', 'levels.id', 'user_speaks_language.level_id')
//     .join('levels as lev', 'lev.id', 'user_learns_language.level_id')
//     //alias languages table to grab values for user_learns_language name and level
//     .join('languages as l', 'l.id', 'user_learns_language.language_id')
//     .select('cities.city','cities.country as city_country', 'users.id as user_id', 'users.name as user_name', 'users.email', 'users.pw', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'levels.name as speaks_level_name', 'l.name as learns_language', 'lev.name as learns_level');
// }

function getAllExchanges() {
  return knex('users')
  .join('user_speaks_language', 'users.id', 'user_speaks_language.user_id')
  .join('user_learns_language', 'users.id', 'user_learns_language.user_id')

  .join('languages', 'languages.id', 'user_speaks_language.user_id')
  .join('languages as l', 'languages.id', 'user_learns_language.user_id')
  .join('language_translations', 'language_translations.language_id', 'languages.id')

  .join('cities', 'cities.id', 'users.city_id')
  .join('city_translations', 'city_translations.city_id', 'cities.id')

  .join('levels', 'levels.id', 'user_speaks_language.level_id')
  .join('level_translations', 'level_translations.level_id', 'levels.id')

  .join('levels as lev', 'lev.id', 'user_learns_language.level_id')
  .join('level_translations as lev_translations', 'lev_translations.level_id', 'levels.id')

  .select('users.id', 'lev_translations.display_name as learns_language_display_name', 'level_translations.display_name as speaks_level_display_name', 'levels.name as speaks_level', 'language_translations.display_name as language_display_name','city_translations.display_name', 'users.name', 'users.email', 'users.pw', 'users.city_id', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'l.name as learns_language');
}

router.get('/', function(req, res) {
  getAllExchanges()
  .then(function(data) {
    console.log(data);
    res.json({all_exchanges: data});
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
  .select('users.id as user_id', 'users.name as user_name', 'users.email', 'users.pw', 'users.city_id as city_id', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'levels.name as speaks_level_name', 'l.name as learns_language', 'lev.name as learns_level')
  .where('user_learns_language.language_id', req.query.i_speak)
  .andWhere('user_speaks_language.language_id', req.query.i_learn)
  .andWhere('users.city_id', req.query.city);
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
