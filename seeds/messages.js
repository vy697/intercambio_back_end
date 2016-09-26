'use strict';

exports.seed = function(knex, Promise) {

  return knex('messages').del()
  .then(function() {
    return Promise.all([
    knex('messages').insert({"id": 1, "thread_id": 1, "sender_id": 1, "recipient_id": 5, "message_text": "Hi, Alexa! Would you want to meet anytime this week for the first date?", "time_sent": new Date(), "unread": false}),
    knex('messages').insert({"id": 2, "thread_id": 2, "sender_id": 1, "recipient_id": 7, "message_text": "Hola, Manuel. Cómo tienes el horario esta semana para quedar?", "time_sent": new Date(), "unread": false}),
    knex('messages').insert({"id": 3, "thread_id": 1, "sender_id": 5, "recipient_id": 1, "message_text": "Hi Jessica, thanks for writing. I'm free on Thursday and Friday in the afternoon if that works for you.", "time_sent": new Date(), "unread": true}),
    knex('messages').insert({"id": 4, "thread_id": 2, "sender_id": 7, "recipient_id": 1, "message_text": "Nos vemos el sábado por la mañana si te parece?", "time_sent": new Date(), "unread": false}),
    knex('messages').insert({"id": 5, "thread_id": 2, "sender_id": 1, "recipient_id": 7, "message_text": "Sounds great!", "time_sent": new Date(), "unread": true}),
    knex('messages').insert({"id": 6, "thread_id":3, "sender_id":3, "recipient_id": 1, "message_text": "Hi Jessica. I just saw your profile and wanted to say hi", "time_sent": new Date(), "unread": false}),
    knex('messages').insert({"id": 7, "thread_id":3, "sender_id":1, "recipient_id": 3, "message_text": "Hi, Lorena! Were you interested in meeting with a group this weekend?", "time_sent": new Date(), "unread": true}),
    knex('messages').insert({"id": 8, "thread_id":4, "sender_id": 2, "recipient_id": 3, "message_text": "How are you, Lorena?", "time_sent": new Date(), "unread": false}),
    knex('messages').insert({"id": 9, "thread_id":4, "sender_id": 3, "recipient_id": 2, "message_text": "I'm good, Bonnie. It's so nice to meet you", "time_sent": new Date(), "unread": false}),
    knex('messages').insert({"id": 10, "thread_id":5, "sender_id": 6, "recipient_id": 1, "message_text": "Hi, Jessica, I'm getting together with some friends on Sunday for an exchange group. Would you want to come?", "time_sent": new Date(), "unread": true})
    // knex('messages').insert({"id": 7, "thread_id":"2", "sender_id": "English", "recipient_id": "", "message_text": "", "time_sent": new Date(), "unread": ""})
    // knex('messages').insert({"id": 7, "thread_id":"2", "sender_id": "English", "recipient_id": "", "message_text": "", "time_sent": new Date(), "unread": ""})
    // knex('messages').insert({"id": 7, "thread_id":"2", "sender_id": "English", "recipient_id": "", "message_text": "", "time_sent": new Date(), "unread": ""})
    ]);
  });
};
