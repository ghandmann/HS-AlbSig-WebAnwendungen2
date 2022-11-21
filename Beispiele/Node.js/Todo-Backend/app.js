var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let todoInMemoryStore = [];
/*
[
    { "title": "XXX", "id": "sljsfg", "created": "dkdkdk" },
]
*/
// Alle Todos auslesen
app.get("/api/v1/todos", (req, res) => {
    return res.send(todoInMemoryStore);
});

// Todo speichern
app.post("/api/v1/todos", (req, res) => {
    var todoBody = req.body;
    todoInMemoryStore.push(todoBody);
    return res.status(200).send();
});

// Todo löschen
app.delete("/api/v1/todos/:todoId", (req, res) => {
    const id = req.params["todoId"]; // Muss Namen in URL matchen

    todoInMemoryStore = todoInMemoryStore.filter(item => item.id != id);
    return res.status(200).send();
});

module.exports = app;
