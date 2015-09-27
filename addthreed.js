var mongoose = require('mongoose');
var fs = require('fs');

var threed = JSON.parse(fs.readFileSync('./js/sample.json'));


mongoose.connect('mongodb://localhost/docqr'); // connect to our database
var View = require('./app/models/project.js').View;


var newV = new View();
newV.threed = threed;

newV.save(function(err){
  console.log(newV._id);
})
