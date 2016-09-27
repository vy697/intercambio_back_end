'use strict';

exports.seed = function(knex, Promise) {

  return knex("user_speaks_language").del()
  .then(function() {
    return Promise.all([
    knex.raw('ALTER SEQUENCE public.user_speaks_language_id_seq RESTART WITH 17;'),
    knex("user_speaks_language").insert({"id": 1, "user_id": 1, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 2, "user_id": 2, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 3, "user_id": 3, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 4, "user_id": 4, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 5, "user_id": 5, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 6, "user_id": 6, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 7, "user_id": 7, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 8, "user_id": 8, "language_id": 1, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 9, "user_id": 9, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 10, "user_id": 10, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 11, "user_id": 11, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 12, "user_id": 12, "language_id": 1, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 13, "user_id": 13, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 14, "user_id": 14, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 15, "user_id": 15, "language_id": 3, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 16, "user_id": 16, "language_id": 3, "level_id": 4})
    ]);
  });
};
