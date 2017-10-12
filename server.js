var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Vehicle = require('./app/models/vehicle');
// Configure app for body-parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup a port for ther server to listen on

var port = process.env.PORT || 3002;

var promise = mongoose.connect('mongodb://localhost:27017/vehicles', {
useMongoClient: true,
keepAlive: true,
reconnectTries: 30
});

// API Router

var router = express.Router();

// All of the api end points to be prefixed with /api

app.use('/api', router);
// MIDDLEWARE 
// This is run before the request can be fulfilled

router.use(function (req, res, next) {
  console.log('Run tasks such a authentication before moving on to route --here');	
next();	
});

router.get('/', function (req, res) {
	res.json({message: 'Welcome to our API'});
});

// Vehicle route

router.route('/vehicle')
.post(function (req, res) {
	var vehicle = new Vehicle();
		vehicle.make = req.body.make;
		vehicle.model = req.body.model;
		vehicle.color = req.body.color;

	vehicle.save(function (err) {
		if (err) {
		res.send(err);
		}
	res.json({message: 'Vehicle was successfully created'});
	});
})
.get(function (req, res) {
   vehicle.find(function (err, vehicles) {
	if (err) {
	  res.send(err);
		}
	  res.json(vehicles);
	});		
});
// Fire up the server

app.listen(port);

console.log('Server Listening on port: ' + port);
