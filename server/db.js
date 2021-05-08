const { Pool } = require('pg');

const pool = new Pool({
  user: 'docker',
  host: 'database',
  database: 'author_sales',
  password: 'docker',
  port: 5432,
});

module.exports = pool;
