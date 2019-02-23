const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (ObjectID.isValid(id)) {
    Todo.findById(id)
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

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  console.log('came here');
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.status(400).send();
      }

      return res.send(todo);
    })
    .catch(e => {
      console.log(e);
      res.status(404).send();
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = { app };
