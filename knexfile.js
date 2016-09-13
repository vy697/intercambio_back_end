'use strict';
// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: "postgres://localhost/intercambio"
  },


  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    }
  };
