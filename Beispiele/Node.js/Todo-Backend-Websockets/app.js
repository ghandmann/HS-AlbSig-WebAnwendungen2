var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { WebSocketServer } = require('ws');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let todoInMemoryStore = [];

// Alle Todos auslesen
app.get("/api/v1/todos", (req, res) => {
    return res.send(todoInMemoryStore);
});

// Todo speichern
app.post("/api/v1/todos", (req, res) => {
    var newTodoItem = req.body;
    todoInMemoryStore.push(newTodoItem);
    broadcastTodoItemCreated(newTodoItem);
    return res.status(200).send();
});

// Todo löschen
app.delete("/api/v1/todos/:todoId", (req, res) => {
    const id = req.params["todoId"]; // Muss Namen in URL matchen

    todoInMemoryStore = todoInMemoryStore.filter(item => item.id != id);

    broadcastTodoItemDeleted(id);
    
    return res.status(200).send();
});

// Redirect requests to / to /todo.html
app.get("/", (req, res) => {
    return res.location("/todo.html").status(302).send();
});

const server = app.listen(3000);
server.on('listening', () => console.log("Server ready on http://localhost:3000/todo.html"));
let websocketServer = new WebSocketServer({ server: server, path: "/live-updates/" });

websocketServer.on('connection', (clientWebsocket) => {
    console.log("new websocket client connected.");

    clientWebsocket.on('close', () => {
        console.log("websocket client disconnected.");
    });
});

function broadcastTodoItemCreated(newTodoItem) {
    var message = {
        type: "todo-item-created",
        newTodoItem: newTodoItem
    };

    broadcastMessage(JSON.stringify(message));
}

function broadcastTodoItemDeleted(deletedTodoItemId) {
    var message = {
        type: "todo-item-deleted",
        deletedTodoItemId: deletedTodoItemId
    };

    broadcastMessage(JSON.stringify(message));
}

function broadcastMessage(message) {
    websocketServer.clients.forEach(client => client.send(message));
}
