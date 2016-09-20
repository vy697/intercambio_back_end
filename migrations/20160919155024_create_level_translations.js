'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('level_translations', function(table) {
    table.increments('id');
    table.integer('level_id');
    table.string('lang_preference');
    table.string('display_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('level_translations');
};
