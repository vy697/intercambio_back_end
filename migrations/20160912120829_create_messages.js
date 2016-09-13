'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id');
    table.integer('sender_id');
    table.integer('receiver_id');
    table.timestamp('time_sent').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
