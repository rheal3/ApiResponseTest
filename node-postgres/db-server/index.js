const express = require("express");
const app = express();
const port = 3001
const db_model = require('./db-model')
app.use(express.json()) // => req.body


app.post('/', (req, res) => {
    db_model.postAccessTokenData(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })