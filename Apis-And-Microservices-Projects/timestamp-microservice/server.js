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
    var date = new Date(input_date);
    var result = {}
    
    if(date.getTime()){
        result = {"unix": date.getTime(), "utc": date.toUTCString()}
    }else {
        result = {"error": "Invalid Date"}
    }
       
    res.send(result);
})

app.listen(process.env.PORT, () => console.log('App Listening On Port ${process.env.PORT}..'))