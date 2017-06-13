var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var postitData = require('./postitData');
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
});

var upload = multer({ storage:storage });

var app = express();

var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get(bodyParser.json());

app.get('/', function (req, res, next) {

  var templateArgs = {
    postits: postitData,
    show: true
  };

  res.render('feedPage', templateArgs);

});


app.post('/', upload.single('myimage'), function(req, res, next) {
  console.log(req.file);
  console.log('/uploads/' + req.file.filename);

  if(req.file){
    var postit = {
      url: '/uploads/' + req.file.filename
    };


    postitData.push(postit);
    fs.writeFile('postitData.json', JSON.stringify(postitData), function(err){
      if (err){
        res.status(500).send("Unable to Upload File.");
      }else{
        //res.status(200).send();
      }
    });
  }else {
    next();
  }
});


app.use(express.static(path.join(__dirname, 'public')));



app.get('/index.js', function(req, res, next) {
  console.log("== url request for index.js");
  app.use(express.static('public'));
});

app.get('/style.css', function(req, res, next) {
  console.log("== url request for style.css");
  app.use(express.static('public'));
});

app.get('*', function(req, res){
	res.status(404).render('404Page');
});

app.listen(port, function () {
  console.log("== Server listening on port", port);
});
