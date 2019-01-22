require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port '+listener.address().port+'..');
});