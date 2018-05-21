const express = require('express');
const listRouter = express.Router({ mergeParams: true });

const User = require('../db/User');

const { handleMongooseError } = require('../utils');

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

module.exports = listRouter;