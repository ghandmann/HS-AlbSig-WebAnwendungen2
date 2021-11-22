const { readFile, writeFile } = require("fs/promises");
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

let inMemoryStore = [];
const storageFilename = "data.json";

app.post("/store", async (req, res) => {
    const json = req.body;

    const jsonString = JSON.stringify(json);
    await writeFile(storageFilename, jsonString);

    return res.status(200).send();
});

app.get("/load", async (req, res) => {
    let jsonString = "[]";

    try {
        jsonString = await readFile(storageFilename);
    }
    catch(error) {
        // intentionally empty
    }

    return res.send(jsonString);
});

module.exports = app;
