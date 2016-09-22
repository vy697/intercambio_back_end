'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

function getUser(req) {
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
    'user_learns_language.language_id as learns_language_id',
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
    'users.city_id',
    'users.description',
    'users.age',
    'users.photo_url',
    'users.pair',
    'users.group',
    'users.online',
    'users.lang_preference'
  )
  .where('language_translations.lang_preference', req.user.lang_preference)
  .andWhere('lang_translations.lang_preference', req.user.lang_preference)
  .andWhere('level_translations.lang_preference', req.user.lang_preference)
  .andWhere('lev_translations.lang_preference', req.user.lang_preference)
  .andWhere('city_translations.lang_preference', req.user.lang_preference)
  .andWhere('users.id', req.user.id);
}

router.get('/', function(req, res) {

  //req.user with your logged in user's info is available through JTWs being unscrambled in app.js middleware
  // console.log('req.user: ', req.user);

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
