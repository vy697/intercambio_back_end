'use strict';

exports.seed = function(knex, Promise) {

  return knex('languages').del()
  .then(function() {
    return Promise.all([
    knex('languages').insert({"id":1,"name":"Spanish","level":"Beginner"}),
    knex('languages').insert({"id":2,"name":"Spanish","level":"Intermediate"}),
    knex('languages').insert({"id":3,"name":"Spanish","level":"Advanced"}),
    knex('languages').insert({"id":4,"name":"Spanish","level":"Native"}),
    knex('languages').insert({"id":5,"name":"English","level":"Beginner"}),
    knex('languages').insert({"id":6,"name":"English","level":"Intermediate"}),
    knex('languages').insert({"id":7,"name":"English","level":"Advanced"}),
    knex('languages').insert({"id":8,"name":"English","level":"Native"})
    // knex('languages').insert({"id":9,"name":"English","level":"Intermediate"}),
    // knex('languages').insert({"id":10,"name":"Spanish","level":"Advanced"}),
    // knex('languages').insert({"id":11,"name":"English","level":"Intermediate"}),
    // knex('languages').insert({"id":12,"name":"Vietnamese","level":"Beginner"}),
    // knex('languages').insert({"id":13,"name":"Portuguese","level":"Native"}),
    // knex('languages').insert({"id":14,"name":"English","level":"Advanced"}),
    // knex('languages').insert({"id":15,"name":"English","level":"Beginner"}),
    // knex('languages').insert({"id":16,"name":"Portuguese","level":"Intermediate"}),
    // knex('languages').insert({"id":17,"name":"French","level":"Advanced"}),
    // knex('languages').insert({"id":18,"name":"French","level":"Native"})
    ]);
  });
};
