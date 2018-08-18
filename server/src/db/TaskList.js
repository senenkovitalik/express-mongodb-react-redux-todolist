const mongoose = require('mongoose');
const { TaskSchema } = require('../db/Task');

const TaskListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  tasks: [TaskSchema],
  visibility_filter: {
    type: String,
    enum: ['SHOW_ACTIVE', 'SHOW_COMPLETED', 'SHOW_ALL'],
    default: 'SHOW_ACTIVE'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
});

TaskListSchema.pre('update', function(next) {
  // `this` point to Query object
  this.update({}, { $set: { modified_at: new Date }});
  next();
});

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = {
  TaskListSchema,
  TaskList
};