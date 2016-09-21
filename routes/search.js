'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

function getAllExchanges(req) {
  console.log(req.query.lang_preference);
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
  .where('language_translations.lang_preference', req.query.lang_preference)
  .andWhere('lang_translations.lang_preference', req.query.lang_preference)
  .andWhere('level_translations.lang_preference', req.query.lang_preference)
  .andWhere('lev_translations.lang_preference', req.query.lang_preference)
  .andWhere('city_translations.lang_preference', req.query.lang_preference);
}

router.get('/', function(req, res) {
  getAllExchanges(req)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  });
});

//cities are requested based on user lang_preference through req.user.lang_preference
function getCities(req) {
  return knex('city_translations')
  .join('cities', 'cities.id', 'city_translations.city_id')
  .select('city_translations.display_name')
  //formerly: req.query.chosen_lang
  .where('city_translations.lang_preference', req.query.lang_preference);
}

//retrieve list of cities in a specified lang to populate city select box
router.get('/cities', function(req, res) {
  getCities(req)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.log('getCities express err:', err);
  });
});

//translate city to city_id before retrieving data
function getCityId(req) {
  console.log(req.query.city);
  return knex('city_translations').select('city_id').where({
    display_name: req.query.city
  });
}

router.get('/results', function(req, res) {
  var city_id = '';

  getCityId(req)
  .then(function(data) {
    console.log('into the then', data);
    city_id = data[0].city_id;
    console.log(city_id);
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
    .where('language_translations.lang_preference', req.query.lang_preference)
    .andWhere('lang_translations.lang_preference', req.query.lang_preference)
    .andWhere('level_translations.lang_preference', req.query.lang_preference)
    .andWhere('lev_translations.lang_preference', req.query.lang_preference)
    .andWhere('city_translations.lang_preference', req.query.lang_preference)
    .andWhere('user_learns_language.language_id', req.query.i_speak)
    .andWhere('user_speaks_language.language_id', req.query.i_learn)
    .andWhere('users.city_id', city_id)
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
});


module.exports = router;
