'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('city_translations', function(table) {
    table.increments('id');
    table.integer('city_id');
    table.string('lang_preference');
    table.string('display_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('city_translations');
};
