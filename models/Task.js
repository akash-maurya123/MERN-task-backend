const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'Personal', // Example: Personal / Work / Study
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
