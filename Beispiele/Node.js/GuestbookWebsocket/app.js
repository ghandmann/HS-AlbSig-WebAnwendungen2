var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-dist');

var app = express();

var websocket = require("express-ws")(app);

var indexRouter = require('./routes/indexRouter');
var apiRouter = require('./routes/guestbookApiRouter')(websocket.getWss());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/', apiRouter);

app.ws('/ws/live-updates', function(ws, req) {
    console.log("[INFO] Accepted new WebSocket connection");

    ws.on('close', () => console.log("[INFO] WebSocket connection closed"));
});

// Deliver the swagger-ui relevant Javascript libs
app.use('/swagger-ui/', express.static(swaggerUi.getAbsoluteFSPath()));

module.exports = app;
