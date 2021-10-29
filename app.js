const express = require('express');
const app = express();
const redis = require('redis').createClient();
const port = process.env.PORT;
var cors = require('cors');
var db = require('./database');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const pins = [
  {
    id: 1,
    lat: 32,
    lng: -96,
    title: "Random place 1",
    description: "A random dumping ground"
  },
  {
    id: 2,
    lat: 31,
    lng: -92,
    title: "Random place 2",
    description: "Another random dumping ground"
  },
  {
    id: 3,
    lat: 30,
    lng: -88,
    title: "Random place 3",
    description: "Yet another random dumping ground"
  },
]

app.get('/pins', (req, res) => {
  redis.get('pins', async (err, redisRes) => {
    if (redisRes) {
      console.log("Cache Hit");
      console.log(redisRes);
      res.send(redisRes);
    } else {
      var query = "SELECT * FROM pins;"
      const dbRes = await db.query(query);
      console.log(dbRes.rows);
      console.log("Cache miss");
      redis.setex('pins', 30, JSON.stringify(dbRes.rows))
      res.send(pins);
    }
  });
})

app.post('/create-pin', (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const title = req.body.title;
  const description = req.body.description;
  db.query(
    'INSERT INTO pins (title, lat, lng, description) VALUES ($1, $2, $3, $4);', 
    [title, lat, lng, description],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
  res.send("Nice");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})