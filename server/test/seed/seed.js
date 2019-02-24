const { ObjectID } = require('mongodb');
const JWT = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'shawn@example.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: JWT.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'lala@example.com',
    password: 'userTwoPass'
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Third test todo',
    completed: true,
    completedAt: 333
  }
];

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done())
    .catch(error => done(error));
};

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  populateUsers,
  users
};
