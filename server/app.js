const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();

// env
const { NODE_ENV = '' } = process.env;
console.log('NODE_ENV', NODE_ENV);

// Database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if (NODE_ENV !== 'test') mongoose.connect('mongodb://localhost/taxi');

app.use(bodyParser.json());
app.use('/', router);

app.use((err, req, res, next) => {
  res
    .status(422)
    .send({ Error: err.message })
});

module.exports = app;
