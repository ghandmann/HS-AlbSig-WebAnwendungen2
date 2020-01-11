var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('connect-busboy');
const fs = require('fs');

// make sure the required folders exist
fs.mkdir('/tmp/shared/done', { recursive: true }, () => console.log("* Created /tmp/shared/done"));
fs.mkdir('/tmp/shared/in-flight', { recursive: true }, () => console.log("* Created /tmp/shared/in-flight"));

var indexRouter = require('./routes/index');
var imageRouter = require('./routes/images');

var app = express();

app.use(logger('dev'));
app.use(busboy({ highWaterMark: 4*1024*1024 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/images', imageRouter);

module.exports = app;
