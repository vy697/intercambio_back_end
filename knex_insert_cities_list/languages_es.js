'use strict';

exports.seed = function(knex, Promise) {

  return knex('languages_es').del()
  .then(function() {
    return Promise.all([
    knex('languages_es').insert({"id":1,"name":"inglés"}),
    knex('languages_es').insert({"id":2,"name":"español"}),
    knex('languages_es').insert({"id":3,"name":"francés"}),
    knex('languages_es').insert({"id":4,"name":"portugués "}),
    knex('languages_es').insert({"id":5,"name":"vietnamita"}),
    knex('languages_es').insert({"id":6,"name":"alemán"}),
    knex('languages_es').insert({"id":7,"name":"árabe"}),
    knex('languages_es').insert({"id":8,"name":"chino"})
    ]);
  });
};
