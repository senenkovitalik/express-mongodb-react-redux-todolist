const express = require('express');
const taskRouter = express.Router({ mergeParams: true });

const User = require('../db/User');

const { findUser, handleMongooseError } = require('../utils');

// create task
taskRouter.post('/:title', findUser, (req, res) => {
  const { id, title } = req.params;
  const { user } = req;

  const list = user.task_lists.id(id);
  const task = list.tasks.create({ title });
  const taskId = task._id;

  list.tasks.push(task);

  user.save()
    .then((user) => {
      res.location(`/api/lists/${id}/tasks/${taskId}`);
      res.status(201).end();
    })
    .catch(err => handleMongooseError(err, res));
});

module.exports = taskRouter;