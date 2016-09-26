'use strict';

'use strict';

exports.seed = function(knex, Promise) {

  return knex('threads').del()
  .then(function() {
    return Promise.all([
    knex('threads').insert({"id": 1, "user1_id": 1, "user2_id": 5, "update_thread": new Date}),
    knex('threads').insert({"id": 2, "user1_id": 1, "user2_id": 7, "update_thread": new Date}),
    knex('threads').insert({"id": 3, "user1_id": 3, "user2_id":  1, "update_thread": new Date}),
    knex('threads').insert({"id": 4, "user1_id": 2, "user2_id": 3, "update_thread": new Date}),
    knex('threads').insert({"id": 5, "user1_id": 6, "user2_id": 1, "update_thread": new Date})
    // knex('threads').insert({"id": 5, "user1_id": 1, "user2_id": 7}),
    // knex('threads').insert({"id": 6, "user1_id": 1, "user2_id": 7})
    ]);
  });
};
