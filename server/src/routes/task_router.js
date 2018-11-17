const express = require('express');
const taskRouter = express.Router({ mergeParams: true });

const { handleMongooseError } = require('../utils');

taskRouter.route('/')
  .get((req, res) => {
    // get list of tasks
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
  })
  .post((req, res) => {
    // create task
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

taskRouter.route('/:task_id')
  .get((req, res) => {
    // get task by ID
    const { user } = req;
    const { list_id, task_id } = req.params;

    const task = user.task_lists.id(list_id).tasks.id(task_id);

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).end();
    }
  })
  .patch((req, res) => {
    // update task
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
    task.modified_at = new Date();
    task.markModified('modified_at');

    user
      .save()
      .then(() => res.status(200).json(task))
      .catch(err => handleMongooseError(err, res));
  })
  .delete((req, res) => {
    // delete task
    const { user, params: {list_id, task_id} } = req;
    const list = user.task_lists.id(list_id);

    if (list === null) { res.status(404).end(); }

    const task = list.tasks.id(task_id);

    if (task) {
      task.remove();
      user
        .save()
        .then(() => {
          res.status(204).end();
        })
        .catch(err => handleMongooseError(err, res));
    } else {
      res.status(404).end();
    }

  });

// change task status
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

module.exports = taskRouter;