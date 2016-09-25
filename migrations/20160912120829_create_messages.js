'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id');
    table.integer('thread_id');
    table.integer('sender_id');
    table.integer('recipient_id');
    table.text('message_text');
    table.timestamp('time_sent').notNullable().defaultTo(knex.raw('now()'));
    table.boolean('unread');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
