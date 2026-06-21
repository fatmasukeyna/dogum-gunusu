const mongoose = require('mongoose');
const PhotoSchema = new mongoose.Schema({
  url: String,
  caption: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Photo', PhotoSchema);