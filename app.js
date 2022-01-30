const express = require('express');
const app = express();
var cors = require('cors');
const pinsRouter = require("./routes/pin");
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use("/pins", pinsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})