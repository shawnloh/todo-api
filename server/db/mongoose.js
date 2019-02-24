const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB || 'mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
});

module.exports = {
  mongoose
};
