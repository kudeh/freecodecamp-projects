require('dotenv').config();
var cors = require('cors');
var dns = require('dns');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var isDomain = async (req, res, next) => {

    var url_to_shorten = req.body.url;
    var domain_start = url_to_shorten.indexOf('.') + 1;
    var domain_end = url_to_shorten.indexOf('.', domain_start) + 4;
    var domain = url_to_shorten.substring(domain_start, domain_end);

    const options = {
        family: 6,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };

    try {
        var data = await dns.lookup(domain, function(err, address, family){
            req.domain = address;
            console.log(req.domain);
        })
    } catch (e) {

    }

    next();
}

var isValidUrl = (req, res, next) => {

  var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  req.isValid = pattern.test(req.body.url);

  next();

}

app.use('/', express.static('public'));
app.use(cors({optionsSuccessStatus: 200}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//app.use('/api/shorturl/new', isDomain);

app.get('/', function(req, res){
    res.sendFile(__dirname+"/views/index.html");
})

app.post('/api/shorturl/new', isValidUrl, function(req, res){

    //console.log(isDomain(domain));

    if(req.isValid){
        res.send({"url": req.body.url, "shorturl": 1});
    }else {
        res.send({"error": "invalid"});
    }

    
})



var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port '+listener.address().port+'..');
});