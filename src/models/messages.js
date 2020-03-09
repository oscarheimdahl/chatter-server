const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  content: String,
  username: String,
  time: Number,
  userID: String
});

module.exports = mongoose.model('Message', schema);
