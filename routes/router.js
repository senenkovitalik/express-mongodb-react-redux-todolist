const express = require('express');
const router = express.Router();
const listRouter = express.Router({ mergeParams: true });

const User = require('../db/User');
const { TaskList } = require('../db/TaskList');

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

function checkAuth(req, res, next) {
  return req.session.user_id
    ? next()
    : res.status(401).send("Unauthorized");
}

function handleMongooseError(err, res) {
  console.log(err);
  switch (err.name) {
    case 'CastError':
    case 'TypeError':
    case 'ValidationError':
      return res.status(400).end();
    default:
      return res.status(500).end();
  }
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

// private routes --->>>

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect(302, '/');
  });
});

router.route('/users/self')
  .patch((req, res) => {

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
  .delete((req, res) => {
    User.remove({ _id: req.session.user_id }, err => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }
      req.session.destroy(err => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        res.location('/');
        res.status(200);
        res.end();
      });
    });
  });

// get all user's lists
listRouter.get('/', (req, res) => {
  User.findById(req.session.user_id, (err, user) => {
    if (err) handleMongooseError(err, res);
    res.status(200).json(user.task_lists);
  })
});

listRouter.get('/:id', (req, res) => {
  User.findById(req.session.user_id, (err, user) => {
    if (err) handleMongooseError(err, res);
    const list = user.task_lists.id(req.params.id);
    res.status(200);
    res.json(list);
  });
});

// create task list
listRouter.post('/:title', (req, res) => {
  const { title } = req.params;

  User.findById(req.session.user_id, (err, user) => {
    if (err) handleMongooseError(err, res);
    const list = user.task_lists.create({ title });
    user.task_lists.push(list);
    user.save()
      .then(() => {
        res.location(`/api/lists/${list._id}`);
        res.status(201);
        res.end();
      })
      .catch(err => handleMongooseError(err, res));
  })
});

// update list title
listRouter.patch('/:id', (req, res) => {
  res.status(405).end();
});

listRouter.patch('/:id/title', (req, res) => {
  res.status(405).end();
});

listRouter.patch('/:id/title/:title', (req, res) => {
  const { id, title } = req.params;

  User.findById(req.session.user_id)
    .then(user => {
      const list = user.task_lists.id(id);
      list.title = title;

      return user.save();
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => handleMongooseError(err, res));
});

// update visibility filter
listRouter.patch('/:id/visibility_filter', (req, res) => {
  res.status(405).end();
});

listRouter.patch('/:id/visibility_filter/:filter', (req, res) => {
  const { id, filter } = req.params;

  User.findById(req.session.user_id)
    .then(user => {
      const list = user.task_lists.id(id);
      list.visibility_filter = filter;

      console.log('list:', list);

      return user.save();
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => handleMongooseError(err, res));
});

listRouter.delete('/', (req, res) => {
  res.status(405).end();
});

listRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.findById(req.session.user_id, (err, user) => {
    if (err) handleMongooseError(err, res);

    try {
      user.task_lists.id(id).remove();
    } catch (err) {
      handleMongooseError(err, res)
    }

    user.save()
      .then(() => {
        res.status(204).end();
      })
      .catch(err => handleMongooseError(err, res));
  });
});

// <<<--- private routes

router.use('/lists', checkAuth, listRouter);

module.exports = router;