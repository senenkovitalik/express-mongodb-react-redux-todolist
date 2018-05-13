const mongoose = require('mongoose');
const email_validator = require('email-validator');
const bcrypt = require('bcryptjs');

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
    trim: true,
    minlength: 8,
    maxlength: 25
  },
  created_at: {
    type: Date
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  task_lists: []
});

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        return callback(err);
      } else if (!user) {
        const err = new Error("User not found");
        err.status = 401; // Unauthorized
        return callback(err);
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    })
};

const User = mongoose.model('User', UserSchema);

module.exports = User;