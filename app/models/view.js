var mongoose = require('mongoose');

var viewSchema = mongoose.Schema({
  threed: Object,
  model: String,
  project: String,
});
module.exports = mongoose.model('View', viewSchema);
