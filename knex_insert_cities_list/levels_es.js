'use strict';

exports.seed = function(knex, Promise) {

  return knex('levels_es').del()
  .then(function() {
    return Promise.all([
      knex('levels_es').insert({"name": "Principiante"}),
      knex('levels_es').insert({"name": "Intermedio"}),
      knex('levels_es').insert({"name": "Advanzado"}),
      knex('levels_es').insert({"name": "Nativo"})
    ]);
  });
};
