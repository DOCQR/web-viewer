var mongoose = require('mongoose');
var fs = require('fs');

var threed = JSON.parse(fs.readFileSync('JSONs/1_rst_advanced_sample_project.rvt119207.json'));


mongoose.connect('mongodb://localhost/docqr'); // connect to our database
var View = require('./app/models/project.js').View;



// var newV = new View();
// newV.threed = threed;

// newV.save(function(err){
//   console.log(newV._id);
// })

// write view to json
// View.findById('5607e43f149bf4f00cb75b8b', function(err, view){
//   fs.writeFileSync('view.json', JSON.stringify(view));
// });
