const express = require('express');
const taskRouter = express.Router({ mergeParams: true });

const { handleMongooseError } = require('../utils');

// get list of tasks
taskRouter.get('/', (req, res) => {
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
taskRouter.get('/:task_id', (req, res) => {
  const { user } = req;
  const { list_id, task_id } = req.params;

  const task = user.task_lists.id(list_id).tasks.id(task_id);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).end();
  }
});

// create task
taskRouter.post('/', (req, res) => {
  const { list_id } = req.params;
  const { title, completed, dueDate } = req.body;
  const { user } = req;

  const list = user.task_lists.id(list_id);
  const task = list.tasks.create({ title, completed, dueDate });
  const task_id = task._id;

  list.tasks.push(task);

  user.save()
    .then(() => {
      res.location(`/api/lists/${list_id}/tasks/${task_id}`);
      res.status(201);
      res.json(Object.assign({}, task._doc, { list_id }));
    })
    .catch(err => handleMongooseError(err, res));
});

// change task status

// todo remove this -> one update method for all
taskRouter.patch('/:task_id/trigger', (req, res) => {
  const { user, params: { list_id, task_id } } = req;

  const list = user.task_lists.id(list_id);
  if (list === null) return res.status(404).send();

  const task = list.tasks.id(task_id);
  if (task === null) return res.status(404).send();

  task.completed = !task.completed;
  user.save()
    .then(() => {
      res.status(204).end();
    })
    .catch(err => handleMongooseError(err, res));
});

// update task
taskRouter.patch('/:task_id', (req, res) => {
  const {
    user,
    params: { list_id, task_id },
    body: {
      title, completed, dueDate
    }
  } = req;


  const list = user.task_lists.id(list_id);
  if (list === null) return res.status(404).end();

  const task = list.tasks.id(task_id);
  if (task === null) return res.status(404).end();

  task.title = title;
  task.completed = completed;
  task.dueDate = dueDate;

  user
    .save()
    .then(() => res.status(204).end())
    .catch(err => handleMongooseError(err, res));
});

// delete task
taskRouter.delete('/:task_id', (req, res) => {
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