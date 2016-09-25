'use strict';

exports.seed = function(knex, Promise) {

  return knex('city_translations').del()
  .then(function() {
    return Promise.all([
      knex('city_translations').insert({"city_id": 1,"lang_preference": "en", "display_name": "Denver, United States"}),
      knex('city_translations').insert({"city_id": 2,"lang_preference": "en", "display_name": "Madrid, Spain"}),
      knex('city_translations').insert({"city_id": 3,"lang_preference": "en", "display_name": "Seville, Spain"}),
      knex('city_translations').insert({"city_id": 4, "lang_preference": "en", "display_name": "Seattle, United States"}),
      knex('city_translations').insert({"city_id": 5, "lang_preference": "en", "display_name": "London, United Kingdom"}),
      knex('city_translations').insert({"city_id": 6, "lang_preference": "en", "display_name": "Paris, France"}),
      knex('city_translations').insert({"city_id": 7, "lang_preference": "en", "display_name": "Fort Collins, United States"}),
      knex('city_translations').insert({"city_id": 1,"lang_preference": "es", "display_name": "Denver, Estados Unidos"}),
      knex('city_translations').insert({"city_id": 2,"lang_preference": "es", "display_name": "Madrid, España"}),
      knex('city_translations').insert({"city_id": 3,"lang_preference": "es", "display_name": "Sevilla, España"}),
      knex('city_translations').insert({"city_id": 4, "lang_preference": "es", "display_name": "Seattle, Estados Unidos"}),
      knex('city_translations').insert({"city_id": 5, "lang_preference": "es", "display_name": "Londres, Reino Unido"}),
      knex('city_translations').insert({"city_id": 6, "lang_preference": "es", "display_name": "París, Francia"}),
      knex('city_translations').insert({"city_id": 7, "lang_preference": "es", "display_name": "Fort Collins, Estados Unidos"}),
    ]);
  });

};
