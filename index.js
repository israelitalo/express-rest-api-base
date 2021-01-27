require('dotenv').config();
var bodyParser = require('body-parser')
var express = require("express")
const cors = require('cors')
var app = express()
var router = require("./routes/routes")

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/", router);

app.listen(8686, () => {
    console.log("Server run");
});
