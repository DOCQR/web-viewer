var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
  version: String,
  threed: Object
})
var modelsSchema = mongoose.Schema({
  project: String,
  currentVersion: String,
  versions: [modelSchema]
});
// define the schema for our project model
var projectSchema = mongoose.Schema({
  users: [String],
  name: String,
  models: [modelsSchema]
});

// create the model for users and expose it to our app
module.exports = {
  Project: mongoose.model('Project', projectSchema),
  Models: mongoose.model('Models', modelsSchema),
  Model: mongoose.model('Model', modelSchema),
};
