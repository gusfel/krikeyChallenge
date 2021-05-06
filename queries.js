const db = require('./db.js');

const getTotals = (name, callback) => {
  db.connect((err, client, done) => {
    if (err) { throw err; }
    client.query(`SELECT * FROM authors WHERE name like '${name}'`, (err2, res) => {
      done();
      if (err2) {
        throw err2;
      } else {
        callback(null, res.rows);
      }
    });
  });
};

module.exports = getTotals;