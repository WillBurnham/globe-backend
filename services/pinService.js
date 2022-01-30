const redis = require('redis').createClient();
var db = require('../database');

const createPin = (req) => {
    console.log("Create pin route hit");
    const lat = req.body.lat;
    const lng = req.body.lng;
    const title = req.body.title;
    const description = req.body.description;
    try {
        db.query(
            'INSERT INTO pins.pins (title, lat, lng, description) VALUES ($1, $2, $3, $4);', 
            [title, lat, lng, description],
            function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
            }
        );
        return "Nice";
    }
    catch (error)
    {
        console.error(error);
        return "Error: check console.";
    }
}

module.exports = {
    createPin
}