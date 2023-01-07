var express = require('express');
var logger = require('morgan');
var { expressjwt: jwt } = require("express-jwt");

var app = express();

app.use(logger('dev'));

const jwtOptions = {
    secret: "xz6d3p&7r@LvA8Eqy^3^9x4v98UXP$Wg", // Secret muss identisch wie im TokenIssuer sein!
    algorithms: ["HS256"],
};

// Öffentliche Endpunkt
app.get("/", (req, res) => {
    return res.send("everybody can see this. But try to get /profile");
})

// Profile Endpunkt, nur erreichbar mit gültigen JWT
app.get(
    "/profile",
    jwt(jwtOptions), // JWT validierung middleware aus express-jwt node module
    (req, res) => {
        // Action wird nur ausgeführt, wenn vorgeschaltene JWT-Validierungs-Middleware erfolgreich durchläuft.
        // Claims aus dem Token extrahieren
        const user = req.auth.sub;
        const shoesize = req.auth.shoesize;
        const birthdate = req.auth.birthdate;

        return res.send(`You made it! You are '${user}' with a shoesize of ${shoesize} and born on ${birthdate}\n`);
    }
);

// Admin Endpunkt, nur erreichbar mit gültigen JWT und isAdmin: true
app.get(
    "/admin",
    jwt(jwtOptions), // JWT validierung middleware aus express-jwt node module
    (req, res) => {
        // Action wird nur ausgeführt, wenn vorgeschaltene JWT-Validierungs-Middleware erfolgreich durchläuft.
        // Claims aus dem Token extrahieren
        const isAdmin = req.auth.isAdmin;

        if(!isAdmin) {
            throw new Error("You have a valid JWT, but you ar not an admin!\n");
        }

        return res.send("Hello admin!");
    }
);

module.exports = app;
