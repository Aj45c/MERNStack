const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
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
    res.send('YO welcome to my people app');
})
// Index-------------------------------------
app.get('/people' , async (req, res) => {
    try {
    res.json(await People.find({}));
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong, go look at the console'})
    }
})
//Create-------------------------------------
app.post('/people', async (req, res) => {
    try {
        res.json(await People.create(req.body));
    } catch (error){
        console.log('error', error);
        res.json({error: "something went wrong check console please"});
    }
})
//Update-------------------------------------
app.put('./people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndUpdate(req.params.id, req.body))

    }catch (error){
        console.log('error: ', error)
        res.json({error: 'somethings wrong check the console'})

    }
})
//Delete-------------------------------------
app.delete('./people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndDelete(req.params.id));
    }catch (error) {
        console.log('error: ', error)
        res.json({error: 'somethings wrong check the console'})
    }
})

app.listen(PORT, () => {
    console.log(`CO-NEECTED TO ${PORT}`)
})