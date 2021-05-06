const express = require('express');
const app = express();
const port = 3000;

const db = require('./db.js');
const getTotals = require('./queries.js');
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/author', (request, response) => {
  // console.log(request.query)
  const authorName = request.query.author_name;
  getTotals(authorName, (err, data) => {
    if (err) { console.log(err); }
    if (data.length) {
      response.send(data);
    } else {
      response.status(404).send('Not Found');
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});