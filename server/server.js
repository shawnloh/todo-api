require('./config/config');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// TODOs
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => {
      res.send({ todos });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (ObjectID.isValid(id)) {
    Todo.findOne({ _id: id, _creator: req.user._id })
      .then(todo => {
        if (!todo) {
          return res.status(404).send();
        }
        res.send({ todo });
      })
      .catch(e => {
        res.status(400).send();
      });
  } else {
    res.status(404).send();
  }
});

app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Todo.findByIdAndDelete(id)
  Todo.findOneAndDelete({ _id: id, _creator: req.user._id })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      return res.send({ todo });
    })
    .catch(e => {
      // console.log(e);
      res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      return res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  if (_.isEmpty(body.email) || _.isEmpty(body.password)) {
    return res.status(400).send();
  }

  const user = new User(body);

  user
    .save()
    .then(user => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(e => res.status(400).send());
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = { app };
