var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// load config files
var mongoConfig = require('./config/mongoose');
var routeConfig = require('./config/route');

// load model
var animalModel = require('./model/animal');

// save port
var port = process.env.PORT || 3000;

// load express app
var app = express();

// load middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

// set view folder and engine
app.set('views', __dirname + '/static/view');
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(mongoConfig.url);

// connect our routes
routeConfig.route(app, animalModel);

// listen on port
app.listen(port, function(){
  console.log("Listening on port: " + port);
});
