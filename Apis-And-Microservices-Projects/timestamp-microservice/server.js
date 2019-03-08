require('dotenv').config()
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html')
})

app.get('/api/timestamp', function(req, res){

    var now = new Date();
    res.send({"unix": now.getTime(), "utc": now.toUTCString()})
})

app.get('/api/timestamp/:date_string', function(req, res){

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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port + "..");
  });
