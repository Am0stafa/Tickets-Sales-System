require('dotenv').config();
// import the knex library that will allow us to
// construct SQL statements
const knex = require('knex');

// define the configuration settings to connect
// to our local postgres server
const config = {
  client: 'pg',
  connection: {
    host: process.envPOSTGRES_HOST,
    port: 5432,
    user: process.POSTGRES_USER,
    password: process.POSTGRES_PASSWORD,
    database: process.POSTGRES_DATABASE,
    pool: { min: 0, max: 10}
  }
};

// create the connection with postgres
const db = knex(config);

// expose the created connection so we can
// use it in other files to make sql statements
module.exports = db;