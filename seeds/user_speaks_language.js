'use strict';

exports.seed = function(knex, Promise) {

  return knex("user_speaks_language").del()
  .then(function() {
    return Promise.all([
    knex.raw('ALTER SEQUENCE public.user_speaks_language_id_seq RESTART WITH 37;'),
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
    knex("user_speaks_language").insert({"id": 16, "user_id": 16, "language_id": 3, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 17, "user_id": 17, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 18, "user_id": 18, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 19, "user_id": 19, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 20, "user_id": 20, "language_id": 1, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 21, "user_id": 21, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 22, "user_id": 22, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 23, "user_id": 23, "language_id": 3, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 24, "user_id": 24, "language_id": 2, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 25, "user_id": 25, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 26, "user_id": 26, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 27, "user_id": 27, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 28, "user_id": 28, "language_id": 1, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 29, "user_id": 29, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 30, "user_id": 30, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 31, "user_id": 31, "language_id": 1, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 32, "user_id": 32, "language_id": 1, "level_id": 4}),

    knex("user_speaks_language").insert({"id": 33, "user_id": 33, "language_id": 5, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 34, "user_id": 34, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 35, "user_id": 35, "language_id": 2, "level_id": 4}),
    knex("user_speaks_language").insert({"id": 36, "user_id": 36, "language_id": 5, "level_id": 4})
    ]);
  });
};
