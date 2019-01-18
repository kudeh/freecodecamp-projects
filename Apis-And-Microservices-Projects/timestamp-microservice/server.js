require('dotenv').config()
var express = require('express')
var app = express()

app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html')
})

app.get('/timestamp', function(req, res){

    var now = new Date();
    res.send({"unix": now.getTime(), "utc": now.toUTCString()})
})

app.get('/timestamp/:date_string', function(req, res){

    var input_date = req.params.date_string;
    var input_date_int = parseInt(input_date);

    if(input_date_int){
        input_date = new Date(input_date_int);
    }else{
        input_date = new Date(input_date);
    }

    var result = {"error": "Invalid Date"};
    
    if(input_date.getTime()){
        result = {"unix": input_date.getTime(), "utc": input_date.toUTCString()}
    }
       
    res.send(result);
})

app.listen(process.env.PORT, () => console.log('App Listening On Port ${process.env.PORT}..'))