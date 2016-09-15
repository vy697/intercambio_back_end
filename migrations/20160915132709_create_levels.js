'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('levels', function(table) {
    table.increments('id');
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('levels');
};
