var mongoose = require('mongoose');

var viewSchema = mongoose.Schema({
  threed: Object,
  model: String,
  project: String,
});
var modelSchema = mongoose.Schema({
  project: String,
  version: String,
  // views: [String]
});


// define the schema for our project model
var projectSchema = mongoose.Schema({
  users: [String],
  name: String,
  currentVersion: String,
  models: [modelSchema]
});

// create the model for users and expose it to our app
module.exports = {
  Project: mongoose.model('Project', projectSchema),
  Model: mongoose.model('Model', modelSchema),
  View: mongoose.model('View', viewSchema),
};
