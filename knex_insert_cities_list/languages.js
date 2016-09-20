'use strict';

exports.seed = function(knex, Promise) {

  return knex('languages').del()
  .then(function() {
    return Promise.all([
    knex('languages').insert({"id":1,"name":"English"}),
    knex('languages').insert({"id":2,"name":"Spanish"}),
    knex('languages').insert({"id":3,"name":"French"}),
    knex('languages').insert({"id":4,"name":"Portuguese"}),
    knex('languages').insert({"id":5,"name":"Vietnamese"}),
    knex('languages').insert({"id":6,"name":"German"}),
    knex('languages').insert({"id":7,"name":"Arabic"}),
    knex('languages').insert({"id":8,"name":"Chinese"})
    ]);
  });
};
