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
  //languages that users speak and learn
  .join('user_speaks_language', 'users.id', 'user_speaks_language.user_id')
  .join('user_learns_language', 'users.id', 'user_learns_language.user_id')
  //speaks level and their translations
  .join('languages', 'user_speaks_language.language_id', 'languages.id')
  .join('language_translations', 'language_translations.language_id', 'languages.id')
  //learns language and their translations
  .join('languages as l', 'user_learns_language.language_id', 'l.id')
  .join('language_translations as lang_translations', 'lang_translations.language_id', 'l.id')
  //speaks level and their translations
  .join('levels', 'levels.id', 'user_speaks_language.level_id')
  .join('level_translations', 'level_translations.level_id', 'levels.id')
  //learns level and their translations
  .join('levels as lev', 'lev.id', 'user_learns_language.level_id')
  .join('level_translations as lev_translations', 'lev_translations.level_id', 'lev.id')

  .join('cities', 'cities.id', 'users.city_id')
  .join('city_translations', 'city_translations.city_id', 'cities.id')

  .select(
    'users.name',
    'user_speaks_language.language_id as speaks_language_id',
    'languages.name as speaks_language',
    'l.name as learns_language',
    'language_translations.display_name as speaks_language_display_name',
    'lang_translations.display_name as learns_language_display_name',
    'levels.name as speaks_level',
    'level_translations.display_name as speaks_level_display_name',
    'lev.name as learns_level',
    'lev_translations.display_name as learns_level_display_name',
    'cities.city as city',
    'city_translations.display_name as translated_location',
    'users.id',
    'users.email',
    'users.pw',
    'users.city_id',
    'users.description',
    'users.age',
    'users.photo_url',
    'users.pair',
    'users.group',
    'users.online',
    'users.lang_preference'
  )
  //TODO: abstract it to take in req.user.lang_preference
  .where('language_translations.lang_preference', 'es')
  .andWhere('lang_translations.lang_preference', 'es')
  .andWhere('level_translations.lang_preference', 'es')
  .andWhere('lev_translations.lang_preference', 'es')
  .andWhere('city_translations.lang_preference', 'es');
}

router.get('/', function(req, res) {
  getAllExchanges()
  .then(function(data) {
    res.json({all_exchanges: data});
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  });
});

//TODO: abstract this out so that cities can be requested based on user lang_preference through req.user.lang_preference
//but how to do for user that isn't logged in!!!!!
function getCities() {
  return knex('city_translations')
  .join('cities', 'cities.id', 'city_translations.city_id')
  .select('city_translations.display_name')
  .where('city_translations.lang_preference', 'en');
}

router.get('/cities/en', function(req, res) {
  getCities()
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.log('getCities express err:', err);
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
