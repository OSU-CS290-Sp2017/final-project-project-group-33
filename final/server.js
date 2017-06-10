var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/feed', function (req, res, next) {

  var templateArgs = {
    show: true
  };

  res.render('feedPage', templateArgs);

});






app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log("== Server listening on port", port);
});
