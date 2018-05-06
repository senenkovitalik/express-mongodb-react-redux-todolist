const mongoose = require('mongoose');

const TaskListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  tasks: [{
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
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

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = {
  TaskListSchema,
  TaskList
};