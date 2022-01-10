const { readFile, writeFile } = require("fs/promises");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todoDb = require('better-sqlite3')("todos.db");

var app = express();

var websocketServer = require('express-ws')(app);

app.ws('/live-updates', function (ws, req) {
    console.log("New websocket client connected.");

    ws.on("close", () => console.log("Client disconnected"));
});

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

    broadcastTodoItemCreated(todoItem);

    return res.status(200).send();
});

app.delete("/v1/todos", async (req, res) => {
    todoDb.exec("DELETE FROM todos");

    broadcastAllTodoItemsDeleted();
    
    return res.status(200).send();
});

app.delete("/v1/todos/:todoItemId", async (req, res) => {
    let todoItemId = req.params["todoItemId"];
    
    todoDb.prepare("DELETE FROM todos WHERE id = ?").run(todoItemId);

    broadcastTodoItemDeleted(todoItemId);

    return res.status(200).send();
});

function broadcastTodoItemCreated(todoItem) {
    const message = {
        type: "TodoItemCreated",
        newTodoItem: todoItem,
    };

    broadcastMessage(message);
}

function broadcastTodoItemDeleted(todoItemId) {
    const message = {
        type: "TodoItemDeleted",
        todoItemId: todoItemId,
    };

    broadcastMessage(message);
}

function broadcastAllTodoItemsDeleted() {
    const message = {
        type: "AllTodoItemsDeleted"
    };

    broadcastMessage(message);
}

function broadcastMessage(message) {
    const messageAsJsonString = JSON.stringify(message);
    websocketServer.getWss().clients.forEach(client => {
        client.send(messageAsJsonString);
    });
}

module.exports = app;
