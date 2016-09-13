'use strict';

exports.seed = function(knex, Promise) {

  return knex('user_learns_language').del()
    .then(function() {
      return Promise.all([
      knex('user_learns_language').insert({"id":1,"user_id":29,"language_id":8}),
      knex('user_learns_language').insert({"id":2,"user_id":7,"language_id":4}),
      knex('user_learns_language').insert({"id":3,"user_id":5,"language_id":13}),
      knex('user_learns_language').insert({"id":4,"user_id":3,"language_id":11}),
      knex('user_learns_language').insert({"id":5,"user_id":5,"language_id":12}),
      knex('user_learns_language').insert({"id":6,"user_id":29,"language_id":14}),
      knex('user_learns_language').insert({"id":7,"user_id":1,"language_id":3}),
      knex('user_learns_language').insert({"id":8,"user_id":3,"language_id":2}),
      knex('user_learns_language').insert({"id":9,"user_id":17,"language_id":9}),
      knex('user_learns_language').insert({"id":10,"user_id":3,"language_id":6}),
      knex('user_learns_language').insert({"id":11,"user_id":26,"language_id":14}),
      knex('user_learns_language').insert({"id":12,"user_id":28,"language_id":17}),
      knex('user_learns_language').insert({"id":13,"user_id":14,"language_id":5}),
      knex('user_learns_language').insert({"id":14,"user_id":6,"language_id":1}),
      knex('user_learns_language').insert({"id":15,"user_id":14,"language_id":5}),
      knex('user_learns_language').insert({"id":16,"user_id":5,"language_id":10}),
      knex('user_learns_language').insert({"id":17,"user_id":2,"language_id":13}),
      knex('user_learns_language').insert({"id":18,"user_id":19,"language_id":17}),
      knex('user_learns_language').insert({"id":19,"user_id":24,"language_id":11}),
      knex('user_learns_language').insert({"id":20,"user_id":24,"language_id":3}),
      knex('user_learns_language').insert({"id":21,"user_id":29,"language_id":9}),
      knex('user_learns_language').insert({"id":22,"user_id":30,"language_id":3}),
      knex('user_learns_language').insert({"id":23,"user_id":12,"language_id":1}),
      knex('user_learns_language').insert({"id":24,"user_id":2,"language_id":5}),
      knex('user_learns_language').insert({"id":25,"user_id":11,"language_id":18}),
      knex('user_learns_language').insert({"id":26,"user_id":7,"language_id":16}),
      knex('user_learns_language').insert({"id":27,"user_id":22,"language_id":17}),
      knex('user_learns_language').insert({"id":28,"user_id":3,"language_id":12}),
      knex('user_learns_language').insert({"id":29,"user_id":29,"language_id":8}),
      knex('user_learns_language').insert({"id":30,"user_id":21,"language_id":8})
    ]);
  });
};
