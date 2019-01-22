require('dotenv').config()

var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors({optionsSuccessStatus: 200}));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html');
})

app.get('/api/whoami', function(req, res){

    var result_json = {};
    result_json["ipaddress"] = req.ip;
    result_json["language"] = req.get('User-Agent');
    result_json["software"] = req.get('Accept-Language');

    res.send(result_json);
})

var listener = app.listen(process.env.PORT, function(){
    console.log('App is listening on ' + listener.address().port + '...');
})