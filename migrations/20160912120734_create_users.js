'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('name');
    table.string('email');
    table.string('pw');
    table.string('city');
    table.text('description');
    table.string('age');
    table.string('photo_url');
    table.boolean('pair');
    table.boolean('group');
    table.boolean('online');
    table.string('lang_preference');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
