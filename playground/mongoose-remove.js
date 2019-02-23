const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const userId = '';
// Todo.deleteMany({})
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => console.log(e));

// Todo.findOneAndDelete({})
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => console.log(e));

Todo.findByIdAndDelete('5c6fe42e2ac4c72250b5cdcc')
  .then(res => console.log(res))
  .catch(e => console.log(e));
