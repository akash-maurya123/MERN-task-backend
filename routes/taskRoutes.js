const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ✅ Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new task
router.post('/', async (req, res) => {
  const { name, type, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  try {
    const newTask = new Task({ name, type, description });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
