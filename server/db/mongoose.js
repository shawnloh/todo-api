const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = {
  mongoose
};
