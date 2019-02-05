require('dotenv').config();

var express = require('express');
var app = express();

/**
 * 
 */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html')
})


var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port ' + listener.address().port + '...');
})