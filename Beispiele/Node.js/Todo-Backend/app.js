var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.inMemoryStore = [];

// Liste alle todo items
app.get("/v1/todo-items/", (req, res) => {
    res.send(app.inMemoryStore);
});

// Neues todo item hinzufügen
app.post("/v1/todo-items/", (req, res) => {
    const newTodoItem = req.body;

    app.inMemoryStore.push(newTodoItem);

    res.status(200).send();
});

// Löschen eines Todo-Items
// /v1/todo-items/apfel -> id=apfel
// /v1/todo-items/123 -> id=123
app.delete("/v1/todo-items/:id", (req, res) => {
    const idToDelete = req.params.id;

    app.inMemoryStore = app.inMemoryStore.filter(item=>item.id !== idToDelete);

    res.send();
});

module.exports = app;
