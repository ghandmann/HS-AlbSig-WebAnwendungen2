var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-dist');

var indexRouter = require('./routes/indexRouter');
var apiRouter = require('./routes/guestbookApiRouter');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/', apiRouter);

// Deliver the swagger-ui relevant Javascript libs
app.use('/swagger-ui/', express.static(swaggerUi.getAbsoluteFSPath()));

module.exports = app;
