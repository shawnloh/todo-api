const mongoose = require('mongoose');

const User = new mongoose.model('User', {
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  }
});

module.exports = { User };
