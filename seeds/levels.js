'use strict';

exports.seed = function(knex, Promise) {

  return knex('levels').del()
  .then(function() {
    return Promise.all([
      knex('levels').insert({"name": "Beginner"}),
      knex('levels').insert({"name": "Intermediate"}),
      knex('levels').insert({"name": "Advanced"}),
      knex('levels').insert({"name": "Native"})    
    ]);
  });
};
