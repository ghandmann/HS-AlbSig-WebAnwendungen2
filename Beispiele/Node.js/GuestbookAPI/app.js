var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var guestbookRouter = require('./routes/guestbook');
var apiRouter = require('./routes/apiRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', guestbookRouter);
app.use('/api/v1/', apiRouter);

module.exports = app;
