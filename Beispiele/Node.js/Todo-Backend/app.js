const { readFile, writeFile } = require("fs/promises");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todoDb = require('better-sqlite3')("todos.db");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/v1/todos", async (req, res) => {
    const todoList = todoDb.prepare("SELECT * FROM todos").all();

    return res.status(200).send(todoList);
});

app.post("/v1/todos", async (req, res) => {
    const todoItem = req.body;

    todoDb.prepare('INSERT INTO todos ("text", id) VALUES (?, ?)').run(todoItem.text, todoItem.id);

    return res.status(200).send();
});

app.delete("/v1/todos", async (req, res) => {
    todoDb.exec("DELETE FROM todos");
    
    return res.status(200).send();
});

app.delete("/v1/todos/:todoItemId", async (req, res) => {
    let todoItemId = req.params["todoItemId"];
    
    todoDb.prepare("DELETE FROM todos WHERE id = ?").run(todoItemId);

    return res.status(200).send();
});

module.exports = app;
