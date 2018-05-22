const express = require('express');
const taskRouter = express.Router({ mergeParams: true });

const { findUser, handleMongooseError } = require('../utils');

// get list of tasks
taskRouter.get('/', findUser, (req, res) => {
  const { user } = req;
  const { listID } = req.params;

  const task_list = user.task_lists.id(listID);

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
taskRouter.get('/:taskID', findUser, (req, res) => {
  const { user } = req;
  const { listID, taskID } = req.params;

  const task = user.task_lists.id(listID).tasks.id(taskID);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).end();
  }
});

// create task
taskRouter.post('/:title', findUser, (req, res) => {
  const { listID, title } = req.params;
  const { user } = req;

  const list = user.task_lists.id(listID);
  const task = list.tasks.create({ title });
  const taskID = task._id;

  list.tasks.push(task);

  user.save()
    .then(() => {
      res.location(`/api/lists/${listID}/tasks/${taskID}`);
      res.status(201).end();
    })
    .catch(err => handleMongooseError(err, res));
});

// change task status
taskRouter.patch('/:taskID/triger', findUser, (req, res) => {
  const { user, params: { listID, taskID } } = req;

  const list = user.task_lists.id(listID);

  if (list === null) {
    res.status(404).send();
  }

  const task = list.tasks.id(taskID);

  if (task) {
    task.completed = !task.completed;
    user.save()
      .then(() => {
        res.status(204).end();
      })
      .catch(err => handleMongooseError(err, res));
  } else {
    res.status(404).end();
  }
});

taskRouter.patch('/:taskID/:title', findUser, (req, res) => {
  const { user, params: { listID, taskID, title } } = req;

  const list = user.task_lists.id(listID);
  if (list === null) return res.status(404).end();

  const task = list.tasks.id(taskID);
  if (task === null) return res.status(404).end();

  task.title = title;
  user.save()
    .then(() => { res.status(204).end(); })
    .catch(err => handleMongooseError(err, res));
});

// delete task
taskRouter.delete('/:taskID', findUser, (req, res) => {
  const { user } = req;
  const { listID, taskID } = req.params;

  const list = user.task_lists.id(listID);

  if (list === null) {
    res.status(404).end();
  }

  const task = list.tasks.id(taskID);

  if (task) {
    task.remove();
    user.save()
      .then(() => {
        res.status(204).end();
      })
      .catch(err => handleMongooseError(err, res));
  } else {
    res.status(404).end();
  }

});

module.exports = taskRouter;