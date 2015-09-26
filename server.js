var express = require('express'),
  app = express(),
  http = require('http'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  rethinkdb = require('rethinkdb'),
  multiparty = require('connect-multiparty'),
  multipartyMiddleware = multiparty();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

//Initialize Express
var app = express();
var server = http.Server(app);

//Express App Settings
app.use(bodyParser.urlencoded({
  extended: true
}));
//Express Settings
app.use(bodyParser.json());
app.use(morgan('dev'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));

//Routes
app.get('/', function(req, res) {
  res.render('index.html');
});

//Start Server
server.listen(3000);
