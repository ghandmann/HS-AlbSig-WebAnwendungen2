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


// Gibt Liste aller TodoItem zurück
app.get("/todo-items/", (req, res) => {

});

// Neues todo item hinzufügen
app.post("/todo-items/", (req, res) => {

});

// Lösche ein todo item
app.delete("/todo-items/:todoItemId", (req, res) => {
    var todoItemIdToDelete = req.params.todoItemIdd;

    res.send("Lösche TodoItem mit Id " + todoItemIdToDelete);

});


module.exports = app;
