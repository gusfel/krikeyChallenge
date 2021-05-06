const express = require('express');

const app = express();
const port = 3000;

const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const queries = require('./queries.js');

app.get('/author', (request, response) => {
  const authorName = request.query.author_name;

  if (authorName) {
    const value = myCache.get(authorName);
    if (value) {
      response.send(value);
    } else {
      queries.getOne(authorName, (err, data) => {
        if (err) { throw err; }
        if (data.length) {
          myCache.set(authorName, data);
          response.send(data);
        } else {
          response.status(404).send('Not Found');
        }
      });
    }
  } else {
    const value = myCache.get('top10');
    if (value) {
      response.send(value);
    } else {
      queries.getTotals((err, data) => {
        if (err) { throw err; }
        if (data.length) {
          myCache.set('top10', data);
          response.send(data);
        } else {
          response.status(404).send('Not Found');
        }
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
