var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require('cors');


const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection to floodDB
mongoose.connect('mongodb://localhost:27017/foodDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to foodDB"));

// Threshold values


// Measurements route to serve data to frontend
app.get("/measurements", async (req, res) => {
    try {
        const sensorData = await db.collection('sensorData').find({}, { _id: -1, createdAt: -1 });
        const finalData = await sensorData.toArray()
        console.log(finalData)
        res.json(finalData);
    } catch (e) {
        res.send(e.message);
    }
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
