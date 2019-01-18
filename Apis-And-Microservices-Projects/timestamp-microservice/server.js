require('dotenv').config()
var express = require('express')
var app = express()

app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html')
})

app.listen(process.env.PORT, () => console.log('App Listening On Port ${process.env.PORT}..'))