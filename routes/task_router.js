const express = require('express');
const taskRouter = express.Router({ mergeParams: true });

const { findUser, handleMongooseError } = require('../utils');

// get list of tasks
taskRouter.get('/', findUser, (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const task_list = user.task_lists.id(id);

  if (task_list !== null) {
    const { tasks } = task_list;

    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
});

// get task by ID
taskRouter.get('/:taskId', findUser, (req, res) => {
  const { user } = req;
  const { id: listId, taskId } = req.params;

  const task = user.task_lists.id(listId).tasks.id(taskId);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).end();
  }
});

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