const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const {PORT = 4000, MONGODB_URL} = process.env;

//Connect to Mongodb
mongoose.connect(MONGODB_URL);

mongoose.connection
.on('connected', () => console.log ('Mongodv is CO-NEECTED'))
.on('error', (err) => console.log ('Error ma boy' + err.message))
//Setup Model--------------------------------
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
});

const People = mongoose.model('People', peopleSchema)

//Middleware--------------------------------
app.use(cors()); //Access-Control-Allow: "*"
app.use(morgan('dev'));
app.use(express.json());
//this creates req.body from incoming JSON request bodies
//app.use(express.urlencoded({extended: false}))
// ^^^ only when express serves html soo like the ejs files

//-------------------------------------------
app.get('/' , (req, res) => {
    res.send('YO');
})

app.listen(PORT, () => {
    console.log(`CO-NEECTED TO ${PORT}`)
})