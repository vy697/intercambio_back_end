'use strict';

exports.seed = function(knex, Promise) {

  return knex('level_translations').del()
  .then(function() {
    return Promise.all([
      knex('level_translations').insert({"level_id": 1, "lang_preference": "en", "display_name": "Beginner"}),
      knex('level_translations').insert({"level_id": 2, "lang_preference": "en", "display_name": "Intermediate"}),
      knex('level_translations').insert({"level_id": 3, "lang_preference": "en", "display_name": "Advanced"}),
      knex('level_translations').insert({"level_id": 4, "lang_preference": "en", "display_name": "Native"}),
      knex('level_translations').insert({"level_id": 1, "lang_preference": "es", "display_name": "Principiante"}),
      knex('level_translations').insert({"level_id": 2, "lang_preference": "es", "display_name": "Intermedio"}),
      knex('level_translations').insert({"level_id": 3, "lang_preference": "es", "display_name": "Advanzado"}),
      knex('level_translations').insert({"level_id": 4, "lang_preference": "es", "display_name": "Nativo"})
    ]);
  });
};
