// Load express module
var express = require('express');

// Create a router instance
var router = express.Router();

// Create an express instance
var app = express();

// Define a route for HTTP-GET on "/"
router.get("/", (request, response) => {
  // Write "Hello World" into the response object
  response.send("Hello World!");
});

// Tell the express app to use the router
app.use('/', router);

module.exports = app;
