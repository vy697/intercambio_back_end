'use strict';

exports.seed = function(knex, Promise) {

  return knex('levels').del()
  .then(function() {
    return Promise.all([
      knex('levels').insert({"id": 1, "name": "Beginner"}),
      knex('levels').insert({"id": 2, "name": "Intermediate"}),
      knex('levels').insert({"id": 3, "name": "Advanced"}),
      knex('levels').insert({"id": 4, "name": "Native"})
    ]);
  });
};
