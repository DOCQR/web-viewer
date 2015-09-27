var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
  project: String,
  version: String,
  views: [Object],
  sheets: [Object]
});

modelSchema.methods.newVersionNumber = function() {
  return Date.now;
};

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
};
