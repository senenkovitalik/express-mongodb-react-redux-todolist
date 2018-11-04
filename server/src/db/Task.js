const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    default: null
  }
});

// todo add timestamp to schema https://mongoosejs.com/docs/guide.html#timestamps

const Task = mongoose.model('Task', TaskSchema);

module.exports = {
  TaskSchema,
  Task
};