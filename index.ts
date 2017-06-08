const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
const config = require('./config');
const TestRowSchema = new Schema({
    constName: { type: String },
    access: { type: Date, default: Date.now() }
});
const RowEntry = mongoose.model('RowEntries', TestRowSchema);

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
    let row = new RowEntry({ constName: 'Sema' });
    row.save((err) => {
        if(err) return res.status(500).send({ message: `Error inserting into DB: ${err}` });
        res.status(200).send({ result: 'ok' });
    });
});

app.get('/db', (req, res) => {
    RowEntry.find({}, function(err, entries) {
        if(err) return res.status(500).send({ message: `Error inserting reading from DB: ${err}` });
        
        let rows = {};
        entries.forEach(function(entry) {
            rows[entry._id] = entry;
        });
        res.send(rows);  
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