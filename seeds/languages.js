'use strict';

exports.seed = function(knex, Promise) {

  return knex('languages').del()
  .then(function() {
    return Promise.all([
    knex('languages').insert({"name":"English"}),
    knex('languages').insert({"name":"Spanish"}),
    knex('languages').insert({"name":"French"}),
    knex('languages').insert({"name":"Portuguese"}),
    knex('languages').insert({"name":"Vietnamese"}),
    knex('languages').insert({"name":"German"}),
    knex('languages').insert({"name":"Arabic"}),
    knex('languages').insert({"name":"Chinese"}),
    ]);
  });
};
