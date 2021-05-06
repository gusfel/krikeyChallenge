const db = require('./db.js');

const getTotals = (callback) => {
  db.connect((err, client, done) => {
    if (err) { throw err; }
    const query = `SELECT
    authors.id,
    authors.name,
    SUM(sale_items.item_price * sale_items.quantity) as sale_total
    FROM authors
    LEFT JOIN books on books.author_id = authors.id
    LEFT JOIN sale_items on sale_items.book_id = books.id
    GROUP BY authors.id
    ORDER BY sale_total DESC
    LIMIT 10;`;
    client.query(query, (err2, res) => {
      done();
      if (err2) {
        throw err2;
      } else {
        callback(null, res.rows);
      }
    });
  });
};

const getOne = (name, callback) => {
  db.connect((err, client, done) => {
    if (err) { throw err; }
    const query = `SELECT
    authors.name,
    SUM(sale_items.item_price * sale_items.quantity) as total_sales
    FROM authors
    LEFT JOIN books on books.author_id = authors.id
    LEFT JOIN sale_items on sale_items.book_id = books.id
    WHERE authors.name LIKE '${name}'
    GROUP BY authors.name`;
    client.query(query, (err2, res) => {
      done();
      if (err2) {
        throw err2;
      } else {
        callback(null, res.rows);
      }
    });
  });
};

module.exports = { getTotals, getOne };
