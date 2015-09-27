var mongoose = require('mongoose');
var fs = require('fs');



var one = '56080dc06bf3665d18f36dd8';
var two = '56080dd36bf3665d18f36dd9';
var three = '56080def6bf3665d18f36ddb';
var four = '56080deb6bf3665d18f36dda';
var five = '56080df26bf3665d18f36ddc';

var threed = JSON.parse(fs.readFileSync('JSONs/1_rst_advanced_sample_project.rvt119207.json'));


mongoose.connect('mongodb://localhost/docqr'); // connect to our database
var View = require('./app/models/view.js');

View.findByIdAndUpdate(one, {$set:{'threed':JSON.stringify(threed)}}, function(err){
	console.log(err)
})

// var newV = new View();
// newV.threed = threed;

// newV.save(function(err){
//   console.log(newV._id);
// })

// write view to json
// View.findById('5607e43f149bf4f00cb75b8b', function(err, view){
//   fs.writeFileSync('view.json', JSON.stringify(view));
// });
