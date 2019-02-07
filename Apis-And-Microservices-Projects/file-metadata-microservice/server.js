require('dotenv').config();
var cors = require('cors');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

var express = require('express');
var app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use('/', express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){

    if(req.file){
        res.send({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
    }else {
        res.send({error: "no file uploaded"});
    }
    
});

var listener = app.listen(process.env.PORT, function(){
    console.log('App is listening on ' + listener.address().port + '..');
});