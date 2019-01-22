require('dotenv').config()

var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors({optionsSuccessStatus: 200}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html');
})

app.get('/api/whoami', function(req, res){

    var result_json = {};
    result_json["ipaddress"] = req.ip;
    result_json["language"] = req.get('Accept-Language');
    result_json["software"] = req.get('User-Agent');

    res.send(result_json);
})

var listener = app.listen(process.env.PORT, function(){
    console.log('App is listening on ' + listener.address().port + '...');
})