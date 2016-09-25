'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('threads', function(table) {
    table.increments('id');
    table.integer('user1_id');
    table.integer('user2_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('threads');
};
