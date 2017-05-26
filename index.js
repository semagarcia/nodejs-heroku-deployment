const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
const config = require('./config');

const TestRowSchema = new Schema({
    constName: { type: String },
    access: { type: Date, default: Date.now() }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.send({
        status: 'ok',
        timestamp: new Date()
    });
});

app.get('/test-db', (req, res) => {
    let RowEntry = mongoose.model('User', TestRowSchema);
    let row = new RowEntry({ constName: 'Sema' });
    row.save((err) => {
        if(err) return res.status(500).send({ message: `Error inserting into DB: ${err}` });
        res.status(200).send({ result: 'ok' });
    });
});

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error connectin to the database: ${err}`)
    }

    app.listen(config.port, () => {
        console.log(`Example app listening on http://localhost:${config.port}!`);
    });
});