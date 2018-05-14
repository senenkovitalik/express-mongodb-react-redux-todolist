const express = require('express');
const router = express.Router();
const User = require('../db/User');

function validatePasswords(pass, conf_pass) {
  if (pass && conf_pass) {
    const password = pass.trim();
    const conf_password = conf_pass.trim();

    if (password.length > 8 && password.length < 25) {
      return password === conf_password;
    }
  }
  return false;
}

router.post('/signup', (req, res) => {
  const { username, email, password, conf_password } = req.body;

  const userData = { username, email, password };

  // if different passwords
  if (!validatePasswords(password, conf_password)) {
    return res.status(400).send('Bad Request (Invalid data)');
  }

  User.create(userData, (err, user) => {

    if (err) {
      console.log(err.message);
      switch (err.name) {
        case 'ValidationError':
          res.status(400).send('Bad Request (Invalid data)');
          break;
        case 'BulkWriteError':
          res.status(400).send('Bad Request (User already exists)');
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
  console.log(req.session.cookie);
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect(302, '/');
  });
});

router.route('/users/self')
  .put((req, res) => {

    const { username, email, password, conf_password } = req.body;
    const updateObj = {};

    if (username) {
      updateObj.username = username
    }

    if (email) {
      updateObj.email = email;
    }

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

    const opts = { runValidators: true };

    User.findByIdAndUpdate(req.session.user_id, updateObj, opts, err => {
      if (err) {
        console.log(err);
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
  .delete((req, res) => {
    const { user_id } = req.session;

    if (user_id) {
      User.remove({ _id: user_id }, err => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        res.location('/');
        res.status(200);
        res.end();
      });
    } else {
      return res.status(400).send("Bad Request");
    }
  });

module.exports = router;