const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlenght: 30,
    minlenght: 2,
  },
  about: {
    type: String,
    required: true,
    maxlenght: 30,
    minlenght: 2,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('users', userSchema);
