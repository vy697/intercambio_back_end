'use strict';

exports.seed = function(knex, Promise) {

  return knex('cities').del()
  .then(function() {
    return Promise.all([
      knex('cities').insert({"city": "Denver", "country": "United States"}),
      knex('cities').insert({"city": "Madrid", "country": "Spain"}),
      knex('cities').insert({"city": "Seville", "country": "Spain"}),
      knex('cities').insert({"city": "Seattle", "country": "United States"}),
      knex('cities').insert({"city": "London", "country": "United Kingdom"}),
      knex('cities').insert({"city": "Paris", "country": "France"})
    ]);
  });

};
