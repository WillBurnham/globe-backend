const pinService = require("../services/pinService");
const redis = require('redis').createClient();
var db = require('../database');

const getAll = (req, res) => {
    redis.get('pins', async (err, redisRes) => {
        if (redisRes) {
          console.log("Cache Hit");
          console.log(redisRes);
          res.send(redisRes);
        } 
        else {
            var query = "SELECT * FROM pins.pins;"
            console.log("Cache miss");
            try {
                const dbRes = await db.query(query);
                console.log(dbRes.rows);
                redis.setex('pins', 30, JSON.stringify(dbRes.rows));
                res.send(dbRes.rows);
            }
            catch (error){
                console.log(error);
                res.send([]);
            }
        }
    });
}

const createPin = (req, res) => {
    res.status(200).send(pinService.createPin(req));
}

//TODO: Implement update pin functionality
const updatePin = (req, res) => {}

//TODO: Implement delete pin functionality
const deletePin = (req, res) => {}

module.exports = {
    getAll,
    createPin,
    updatePin,
    deletePin
}