'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('languages', function(table) {
    table.increments('id');
    table.string('name');
    table.string('level');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('languages');
};
