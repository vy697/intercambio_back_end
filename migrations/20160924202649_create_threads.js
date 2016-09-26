'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('threads', function(table) {
    table.increments('id');
    table.integer('user1_id');
    table.integer('user2_id');
    table.timestamp('update_thread').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('threads');
};
