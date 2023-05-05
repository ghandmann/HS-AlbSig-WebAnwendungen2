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

let todoItemStore = [];

app.get("/api/v1/todos/", (req, res) => {
    res.send(todoItemStore);
});

// POST new TodoItem as JSON
// { "title": "yada", "id": 12, "created": "2023-04-24T12:00:00Z" }
app.post("/api/v1/todos", (req, res) => {
    const newTodoItem = req.body;
    // TODO validate incoming data object
    todoItemStore.push(newTodoItem);
    res.status(200).send();
});

app.delete("/api/v1/todos/:todoId", (req, res) => {
    const idToDelete = req.params.todoId;

    todoItemStore = todoItemStore.filter((item) => {
        return item.id != idToDelete;
    });

    res.status(200).send();
});

module.exports = app;
