const express = require('express');
const app = express();
const port = 3000;

const queries = require('./queries.js');

app.get('/author', (request, response) => {
  const authorName = request.query.author_name;
  const dataResponse = (err, data) => {
    if (err) { throw err; }
    if (data.length) {
      response.send(data);
    } else {
      response.status(404).send('Not Found');
    }
  };

  if (authorName) {
    queries.getOne(authorName, dataResponse);
  } else {
    queries.getTotals(dataResponse);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});