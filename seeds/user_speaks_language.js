'use strict';

exports.seed = function(knex, Promise) {

  return knex('user_speaks_language').del()
  .then(function() {
    return Promise.all([
      knex('user_speaks_language').insert({"user_id":1,"language_id":1, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":2,"language_id":2, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":3,"language_id":1, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":4,"language_id":2, "level_id": 3}),
      knex('user_speaks_language').insert({"user_id":5,"language_id":1, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":6,"language_id":1, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":7,"language_id":2, "level_id": 3}),
      knex('user_speaks_language').insert({"user_id":8,"language_id":2, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":9,"language_id":1, "level_id": 4}),
      knex('user_speaks_language').insert({"user_id":10,"language_id":2, "level_id": 3})
      // knex('user_speaks_language').insert({"id":11,"user_id":20,"language_id":3}),
      // knex('user_speaks_language').insert({"id":12,"user_id":15,"language_id":4}),
      // knex('user_speaks_language').insert({"id":13,"user_id":14,"language_id":4}),
      // knex('user_speaks_language').insert({"id":14,"user_id":18,"language_id":6}),
      // knex('user_speaks_language').insert({"id":15,"user_id":19,"language_id":3}),
      // knex('user_speaks_language').insert({"id":16,"user_id":17,"language_id":6}),
      // knex('user_speaks_language').insert({"id":17,"user_id":12,"language_id":4}),
      // knex('user_speaks_language').insert({"id":18,"user_id":16,"language_id":6}),
      // knex('user_speaks_language').insert({"id":19,"user_id":13,"language_id":2}),
      // knex('user_speaks_language').insert({"id":20,"user_id":11,"language_id":2}),
      // knex('user_speaks_language').insert({"id":21,"user_id":10,"language_id":3}),
      // knex('user_speaks_language').insert({"id":22,"user_id":9,"language_id":1}),
      // knex('user_speaks_language').insert({"id":23,"user_id":8,"language_id":3}),
      // knex('user_speaks_language').insert({"id":24,"user_id":7,"language_id":4}),
      // knex('user_speaks_language').insert({"id":25,"user_id":5,"language_id":7}),
      // knex('user_speaks_language').insert({"id":26,"user_id":4,"language_id":5}),
      // knex('user_speaks_language').insert({"id":27,"user_id":6,"language_id":1}),
      // knex('user_speaks_language').insert({"id":28,"user_id":1,"language_id":4}),
      // knex('user_speaks_language').insert({"id":29,"user_id":2,"language_id":3}),
      // knex('user_speaks_language').insert({"id":30,"user_id":3,"language_id":1})
    ]);
  });
};
