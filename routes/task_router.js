const express = require('express');
const taskRouter = express.Router({ mergeParams: true });

const User = require('../db/User');

const { handleMongooseError } = require('../utils');

// create task
taskRouter.post('/tasks/:title', (req, res) => {
  const { id, title } = req.params;

  let taskId = null;

  User.findById(req.session.user_id)
    .then(user => {
      const list = user.task_lists.id(id);
      const task = list.tasks.create({ title });
      taskId = task._id;
      list.push(task);

      return user.save();
    })
    .then(() => {
      res.location(`/api/lists/${id}/tasks/${taskId}`);
      res.status(201).end();
    })
    .catch(err => handleMongooseError(err, res));
});

module.exports = taskRouter;