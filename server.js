const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const {PORT = 4000, MONGODB_URL} = process.env;

//Connect to Mongodb
mongoose.connect(MONGODB_URL);

mongoose.connection
.on('connected', () => console.log ('Mongodv is CO-NEECTED'))
.on('error', (err) => console.log ('Error ma boy' + err.message))

//-------------------------------------------
app.get('/' , (req, res) => {
    res.send('YO');
})

app.listen(PORT, () => {
    console.log(`CO-NEECTED TO ${PORT}`)
})