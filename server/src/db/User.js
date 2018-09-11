const mongoose = require('mongoose');
const email_validator = require('email-validator');
const bcrypt = require('bcryptjs');

const { TaskListSchema } = require('./TaskList');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return email_validator.validate(value);
      },
      message: '{VALUE} id not a valid email'
    },
    required: [true, 'User email required'],
    trim: true,
    tolowercase: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  task_lists: [TaskListSchema]
});

// hash password before update
UserSchema.pre('update', function(next) {
  const { password } = this.getUpdate();

  if (password) {
    bcrypt.hash(password, 10).then(hash => {
      this.update({}, { password: hash });
      next();
    }).catch(err => next(err));
  } else {
    next();
  }
});

UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  }).catch(err => next(err));
});

UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email }).exec()
    .then(user => {
      bcrypt.compare(password, user.password)
        .then(res => res ? callback(null, user) : callback())
        .catch(() => callback());
    })
    .catch(err => {
      if (err) {
        return callback(err);
      } else if (!user) {
        const err = new Error("User not found");
        err.status = 401; // Unauthorized
        return callback(err);
      }
    })
};

const User = mongoose.model('User', UserSchema);

module.exports = User;