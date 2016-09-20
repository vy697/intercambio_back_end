'use strict';

exports.seed = function(knex, Promise) {

  return knex('cities').del()
  .then(function() {
    return Promise.all([
      knex('cities').insert({"id": 1, "city": "Denver", "country": "United States"}),
      knex('cities').insert({"id": 2, "city": "Madrid", "country": "Spain"}),
      knex('cities').insert({"id": 3, "city": "Seville", "country": "Spain"}),
      knex('cities').insert({"id": 4, "city": "Seattle", "country": "United States"}),
      knex('cities').insert({"id": 5, "city": "London", "country": "United Kingdom"}),
      knex('cities').insert({"id": 6, "city": "Paris", "country": "France"})
    ]);
  });

};
