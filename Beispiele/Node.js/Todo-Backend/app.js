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
    const todoItem = req.body;

    const newId = todoItem.id;
    const alreadyExists = app.inMemoryStore.filter((candiate) => candiate.id == newId).length == 1;
    if(alreadyExists) {
        return res.status(409).send("item with id already exists");
    }

    app.inMemoryStore.push(todoItem);

    res.status(200).send("todo item created");
});

// Löschen eines Todo-Items
app.delete("/v1/todo-items/:id", (req, res) => {
    const filteredList = app.inMemoryStore.filter(
        (candidate) => {
            return candidate.id != req.params.id;
    });

    app.inMemoryStore = filteredList;

    res.status(200).send();
});

module.exports = app;
