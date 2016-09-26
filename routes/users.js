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
    'levels.id as speaks_id',
    'lev.name as learns_level',
    'lev.id as learns_id',
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
  getUser(req)
  .then(function(data) {
    console.log('getUser data: ', data);
    res.json({data: data});
  })
  .catch(function(err) {
    console.log('get user error: ', err);
  });
});

function getUserProfile(req) {

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
  .andWhere('users.id', req.query.id);
}

router.get('/profile', function(req, res) {
  getUserProfile(req)
  .then(function(data) {
    res.json({getUserProfile: data});
  })
  .catch(function(err) {
    res.json({getUserProfileErr: err});
  });
});

function getUserThreads(req) {
  return knex('messages')
  .join('users', 'users.id', 'messages.sender_id')
  .join('users as u', 'u.id', 'messages.recipient_id')
  .join('threads', 'threads.id', 'messages.thread_id')
  .select(knex.raw('(case when threads.user1_id = ? then user2_id else user1_id end) as partner_id', [req.user.id]),'threads.user1_id as thread_receiver', 'threads.id as thread_id', 'messages.id as message_id', 'messages.thread_id','messages.message_text', 'messages.time_sent', 'messages.unread', 'users.name as sender', 'u.name as recipient')
  //grab all msgs where logged in user is either the sender or the recipient(any thread that they participate in)
  .where('messages.sender_id', req.user.id)
  .orWhere('messages.recipient_id', req.user.id);
}

router.get('/messages', function(req, res) {
  getUserThreads(req)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json({getMessagesErr: err});
  });
});

// router.post('/messages', function(req, res) {
//look to see if thread id exists
//   if(!req.body.thread_id) {
//     return knex('threads').insert({
//       user1_id: req.body.user1,
//       user2_id: req.body.user2,
//       update_thread: new Date()
//     })
//     .returning('id')
//     .then(function(id) {
//       return knex('messages').insert({
//         thread_id: id,
//         sender_id: req.body.sender_id,
//         recipient_id: req.body.recipient_id,
//         time_sent: new Date(),
//         unread: true
//       })
//       .then(function(data) {
//         res.json(data);
//       })
//       .catch(function(err) {
//         console.log('postmessage with thread insert err: ', err);
//         res.json('postmessage with thread insert err: ', err);
//       });
//     });
//   } else {
//     return knex('messages').insert({
//       thread_id: req.body.id,
//       sender_id: req.body.sender_id,
//       recipient_id: req.body.recipient_id,
//       time_sent: new Date(),
//       unread: true
//     })
//     .catch(function(err) {
//       res.json({msginserterr: err});
//     });
//   }
// });

module.exports = router;
