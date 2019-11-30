/* eslint-disable linebreak-style */

/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const path = require('path');


const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');
const feedRoutes = require('./routes/feed');
const gifsRoutes = require('./routes/gifs');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/articles', articlesRoutes);
app.use('/api/v1/feed', feedRoutes);
app.use('api/v1/gifs', gifsRoutes);
module.exports = app;
