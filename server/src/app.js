const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./routes/api');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/', api);

app.get('/*', (req, res) => {
    res.send('Invalid URL...')
});


module.exports = app;