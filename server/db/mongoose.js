const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://todoapp:BJSva2d8y!F7&CcDM8LD@ds237072.mlab.com:37072/todoapp-456',
  // 'mongodb://localhost:27017/TodoApp',
  {
    useNewUrlParser: true
  }
);

module.exports = {
  mongoose
};
