require('dotenv').config();
var cors = require('cors');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname+"/views/index.html");
})

app.post('/api/shorturl/new', function(req, res){
    res.send('shorten');
})

var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port '+listener.address().port+'..');
});