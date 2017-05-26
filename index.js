const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/test', function (req, res) {
    res.send({
        status: 'ok',
        timestamp: new Date()
    });
});

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error connectin to the database: ${err}`)
    }

    app.listen(config.port, function () {
        console.log(`Example app listening on http://localhost:${config.port}!`);
    });
});