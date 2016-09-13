'use strict';

var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex.js');

//     function getBooks() {
//     return knex('book_author')
//         .join('authors', 'authors.id', 'book_author.author_id')
//         .join('books', 'books.id', 'book_author.book_id')
//         .select('books.id', 'books.title', 'books.cover_url', 'books.description', 'books.genre', 'authors.f_name', 'authors.l_name', 'book_author.author_id', 'authors.bio', 'authors.portrait_url');
// }

function getExchanges() {
  return knex('user_speaks_language')
    .join('languages', 'languages.id', 'user_speaks_language.language_id')
    .join('users', 'users.id', 'user_speaks_language.user_id')
    .join('user_learns_language', 'user_learns_language.user_id', 'user_speaks_language.user_id')
    .select('users.id as user_id', 'users.email', 'users.pw', 'users.city', 'users.description', 'users.age', 'users.photo_url', 'users.pair', 'users.group', 'users.online', 'users.lang_preference', 'languages.name as speaks_language', 'languages.level as speaks_language_level', 'user_learns_language.language_id as user_learns_language_id');
}

router.get('/', function(req, res, next) {
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
