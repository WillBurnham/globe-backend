const pg = require("pg");
const conString = "postgres://postgres:admin1234@localhost:5432/postgres";
var db = new pg.Client(conString);
db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to DB");
    }
});

module.exports = db;