import jwt from 'jsonwebtoken';

let claims = {
    "sub": "MagicMike",
    "shoesize": 47,
    "birthdate": "1990-01-01",
    "isAdmin": false, // auf true setzen, um Admin-Token zu erzeugen.
};

let sharedSecret = "xz6d3p&7r@LvA8Eqy^3^9x4v98UXP$Wg";


var token = jwt.sign(claims, sharedSecret, { algorithm: "HS256" });

console.log(token);
