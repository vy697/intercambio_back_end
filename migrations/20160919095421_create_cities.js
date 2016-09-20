'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', function(table) {
    table.increments('id');
    table.string('city');
    table.string('country');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
