const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = '5c6fdb96587bbc1e0a654e43';
const userId = '5c6fc60f91de0613a007824d';

// Todo.find({
//   _id: id
// })
//   .then(todos => {
//     console.log('Todos', todos);
//   })
//   .catch(e => console.log(e));

// Todo.findOne({
//   _id: id
// })
//   .then(todo => {
//     console.log('Todo', todo);
//   })
//   .catch(e => console.log(e));

// if (!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
// }

// Todo.findById(id)
//   .then(todo => console.log('Todo', todo))
//   .catch(e => console.log(e));

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log('unable to find user');
    }

    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(e => console.log(e));
