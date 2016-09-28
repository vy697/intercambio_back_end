'use strict';

exports.seed = function(knex, Promise) {

  return knex('language_translations').del()
  .then(function() {
    return Promise.all([
    knex('language_translations').insert({"language_id": 1, "lang_preference":"en", "display_name": "English"}),
    knex('language_translations').insert({"language_id": 2, "lang_preference":"en", "display_name": "Spanish"}),
    knex('language_translations').insert({"language_id": 3, "lang_preference":"en", "display_name": "French"}),
    knex('language_translations').insert({"language_id": 4, "lang_preference":"en", "display_name": "Portuguese"}),
    knex('language_translations').insert({"language_id": 5, "lang_preference":"en", "display_name": "German"}),
    knex('language_translations').insert({"language_id": 6, "lang_preference":"en", "display_name": "Vietnamese"}),
    knex('language_translations').insert({"language_id": 7, "lang_preference":"en", "display_name": "Arabic"}),
    knex('language_translations').insert({"language_id": 8, "lang_preference":"en", "display_name": "Chinese"}),
    knex('language_translations').insert({"language_id": 1, "lang_preference":"es", "display_name": "inglés"}),
    knex('language_translations').insert({"language_id": 2, "lang_preference":"es", "display_name": "español"}),
    knex('language_translations').insert({"language_id": 3, "lang_preference":"es", "display_name": "francés"}),
    knex('language_translations').insert({"language_id": 4, "lang_preference":"es", "display_name": "portugués"}),
    knex('language_translations').insert({"language_id": 5, "lang_preference":"es", "display_name": "alemán"}),
    knex('language_translations').insert({"language_id": 6, "lang_preference":"es", "display_name": "vietnamita"}),
    knex('language_translations').insert({"language_id": 7, "lang_preference":"es", "display_name": "árabe"}),
    knex('language_translations').insert({"language_id": 8, "lang_preference":"es", "display_name": "chino"})
    ]);
  });
};
