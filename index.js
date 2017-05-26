var express = require('express');
var app = express();
var config = require('./config');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.port, function () {
  console.log(`Example app listening on http://localhost/${config.port}!`);
});