const express = require('express');
const router = express.Router();
const listRouter = require('./list_router');
const taskRouter = require('./task_router');

const User = require('../db/User');

const { validatePasswords, checkAuth, findUser, handleMongooseError } = require('../utils');

router.post('/signup', (req, res) => {
  const { username, email, password, conf_password } = req.body;

  const userData = { username, email, password };

  // also check user data here

  // if different passwords
  if (!validatePasswords(password, conf_password)) {
    return res.status(400).send('Bad Request (Invalid data)');
  }

  User.create(userData, (err, user) => {

    if (err) {
      console.log(err);
      switch (err.name) {
        case 'MongoError':
          if (err.code === 11000) {
            res.status(409).send('Conflict (User already exists)');
          }
          break;
        case 'ValidationError':
          res.status(400).send('Bad Request (Invalid data)');
          break;
        case 'BulkWriteError':
          res.status(409).send('Conflict (User already exists)');
          break;
        default:
          res.status(500).send("Internal Server Error");
      }
      return;
    }

    req.session.user_id = user._id;

    res.location('/');
    res.status(201).send("Created");
  });
});

// check if username/email already exists in DB
router.get('/check', (req, res) => {

  const { param, val } = req.query;

  if (param.trim() && val.trim()) {
    User.findOne({ [param.trim()]: val.trim() }, (err, doc) => {
      if (err) {
        res.status(500).end();
      } else {
        if (doc) {
          console.log(doc);
          res.status(409).end();
        } else {
          res.status(200).end();
        }
      }
    });
  } else {
    res.status(400).end();
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.authenticate(email, password, (err, user) => {
    if (err) {
      return res.status(401).send("Unauthorized (Wrong username or password)");
    }

    if (user) {
      req.session.user_id = user._id;
      return res.status(200).send("OK");
    } else {
      return res.status(401).send("Unauthorized (Wrong username or password)");
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send("OK");
  });
});

router.route('/users/self')
  .patch(checkAuth, (req, res) => {

    const { username, email, password, conf_password } = req.body;
    const updateObj = {};

    if (username) updateObj.username = username;
    if (email) updateObj.email = email;

    if (password && conf_password) {
      if (validatePasswords(password, conf_password)) {
        updateObj.password = password;
      } else {
        return res.status(400).send("Bad Request");
      }
    }

    // no data provided
    if (Object.keys(updateObj).length === 0) {
      return res.status(400).send("Bad Request");
    }

    const id = req.session.user_id;
    const opts = {
      upsert: false,
      runValidators: true
    };

    User.update({ _id: id }, updateObj, opts, err => {
      if (err) {
        console.log(err.message);
        switch (err.name) {
          case "ValidationError":
            return res.status(400).send("Bad Request");
          default:
            return res.status(500).send("Internal Server Error");
        }
      }

      /*
       * User must relogin if email or pass updated
       */
      if (email || password) {
        req.session.destroy(err => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
          }
          res.redirect(302, '/login');
        });
      } else {
        return res.status(200).send("OK");
      }
    });
  })
  .delete(checkAuth, (req, res) => {
    User.remove({ _id: req.session.user_id })
      .then(() => {
        req.session.destroy(err => {
          if (err) handleMongooseError(err, res);

          res.location('/');
          res.status(200);
          res.end();
        });
      })
      .catch(err => handleMongooseError(err, res));
  });

router.use('/lists', checkAuth, listRouter);
router.use('/lists/:list_id/tasks', checkAuth, findUser, taskRouter);

module.exports = router;