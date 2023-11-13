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

app.get("/todo-items/", (req, res) => {
    res.send(app.inMemoryStore);
});

// Neues todo item hinzufügen
app.post("/todo-items/", (req, res) => {
    var todoItem = req.body;

    app.inMemoryStore.push(todoItem);

    res.status(200).send();
});

// Löschen eines Todo-Items
app.delete("/todo-items/:id", (req, res) => {
    const idToDelete = req.params.id;

    app.inMemoryStore = app.inMemoryStore.filter(
        (candiate) => {
            return candiate.id !== idToDelete
        }
    );

    return res.status(200).send();
});

module.exports = app;
