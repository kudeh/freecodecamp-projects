require('dotenv').config()
var express = require('express')
var app = express()

app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html')
})

app.get('/:date_string', function(req, res){

    var p = req.params.date_string;
    var result = {}

    res.send(result);

    console.log(p);
})

app.listen(process.env.PORT, () => console.log('App Listening On Port ${process.env.PORT}..'))