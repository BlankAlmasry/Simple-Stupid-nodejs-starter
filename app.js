require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const router = require('./router');

module.exports = app;
mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/', router);

module.exports = app;
