const express = require('express');

const app = express();
const port = 3000;

const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const queries = require('./queries.js');

app.get('/author', (request, response) => {
  const authorName = request.query.author_name;
  const sendData = (err, data, key) => {
    if (err) { throw err; }
    if (data.length) {
      myCache.set(key, data);
      response.send(data);
    } else {
      response.status(404).send('Not Found');
    }
  };

  if (authorName) {
    const value = myCache.get(authorName);
    if (value) {
      response.send(value);
    } else {
      queries.getOne(authorName, sendData);
    }
  } else {
    const value = myCache.get('top10');
    if (value) {
      response.send(value);
    } else {
      queries.getTotals(sendData);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
