var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { WebSocketServer } = require("ws");

var app = express();
var websocketServer = undefined;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let todoItemStore = [];

// Gibt Liste aller TodoItem zurück
app.get("/todo-items/", (req, res) => {
    res.send(todoItemStore);
});

// Neues todo item hinzufügen
app.post("/todo-items/", (req, res) => {
    var todoItem = req.body;

    todoItemStore.push(todoItem);

    res.status(200).send();
});

// Lösche ein todo item
app.delete("/todo-items/:todoItemId", (req, res) => {
    let todoItemIdToDelete = req.params.todoItemId;

    todoItemStore = todoItemStore.filter((todoItem) => todoItem.id !== todoItemIdToDelete);

    res.status(200).send();
});

const server = app.listen(3000);
server.on('listening', () => console.log("Server ready on http://localhost:3000/"));
websocketServer = new WebSocketServer({ server: server, path: "/ws/" });

websocketServer.on('connection', (clientWebsocket) => {
    console.log("new websocket client connected.");

    clientWebsocket.on('close', () => {
        console.log("websocket client disconnected.");
    });
});
