const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB service port
const mongoURI = "mongodb://localhost/xmeme"
mongoose.connect(process.env.MONGODB_URI || mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const memesRouter = require('./routes/memes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express app setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/memes', memesRouter);

module.exports = app;
