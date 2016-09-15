'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_learns_language', function(table) {
    table.increments('id');
    table.integer('user_id');
    table.integer('language_id');
    table.integer('level_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_learns_language');
};
