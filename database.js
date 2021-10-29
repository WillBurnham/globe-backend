const pg = require("pg");
const fs = require('fs');

let data = fs.readFileSync('properties.json');
let properties = JSON.parse(data);
const conString = "postgres://" + properties["dbUserName"] + ":" + properties["dbPassword"] + "@localhost:5432/postgres";
var db = new pg.Client(conString);

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to DB");
    }
});

module.exports = db;