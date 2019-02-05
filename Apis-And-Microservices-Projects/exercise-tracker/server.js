require('dotenv').config();
var cors = require('cors');

var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String
});

//set up DB connection
var connection = mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

var bodyParser = require('body-parser');

app.use(cors);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * 
 */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/api/exercise/new-user', function(req, res){
   
    //check if username exists



    //save username & id to database

})


// Not found middleware
app.use((req, res, next) => {
    return next({ status: 404, message: 'not found' })
})

// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage

    if (err.errors) {
        // mongoose validation error
        errCode = 400 // bad request
        const keys = Object.keys(err.errors)
        // report the first validation error
        errMessage = err.errors[keys[0]].message
    } else {
        // generic or custom error
        errCode = err.status || 500
        errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
        .send(errMessage)
})

var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port ' + listener.address().port + '...');
})