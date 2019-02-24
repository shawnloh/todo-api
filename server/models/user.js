const mongoose = require('mongoose');
const validator = require('validator');
const JWT = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'The minimum length of 6 character is not met.']
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = JWT.sign(
    { _id: user._id.toHexString(), access },
    'abc123'
  ).toString();
  user.tokens = user.tokens.concat([
    {
      access,
      token
    }
  ]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = JWT.verify(token, 'abc123');
  } catch (error) {
    return Promise.reject('Unauthorized');
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return new Promise((resolve, reject) => {
    User.findOne({ email }).then(user => {
      if (!user) {
        return reject('User does not exist');
      }
      bcrypt.compare(password, user.password).then(passwordCorrect => {
        if (!passwordCorrect) {
          return reject();
        }
        return resolve(user);
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt
    .genSalt(10)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(e => next(e));
});
const User = mongoose.model('User', UserSchema);

module.exports = { User };
