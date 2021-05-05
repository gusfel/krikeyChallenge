const express = require('express');
const app = express();
const port = 3000;

const db = require('./db.js');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/author', (req, response) => {
  db.connect((err, client, done) => {
    if (err) { throw err; }
    client.query('SELECT * FROM authors', (err, res) => {
      done();
      if (err) {
        console.log(err.stack)
      } else {
        response.send(res.rows[0])
      }
    })
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});