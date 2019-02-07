require('dotenv').config();
var cors = require('cors');

var express = require('express');
var app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use('/', express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/api/fileanalyse', function(req, res){
    console.log('file upload');
})

var listener = app.listen(process.env.PORT, function(){
    console.log('App is listening on ' + listener.address().port + '..');
});