const express = require('express');
const app = express();
const port = 3000;

const queries = require('./queries.js');
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/author', (request, response) => {
  // console.log(request.query)
  const authorName = request.query.author_name;
  if (authorName) {
    queries.getOne(authorName, (err, data) => {
      if (err) { console.log(err); }
      if (data.length) {
        response.send(data);
      } else {
        response.status(404).send('Not Found');
      }
    });
  } else {
    queries.getTotals((err, data) => {
      if (err) { console.log(err); }
      if (data.length) {
        response.send(data);
      } else {
        response.status(404).send('Not Found');
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});