const express = require('express');
const Task = require('../models/Task');
const { validateTask } = require('../middleware/validation');
const { cache, KEYS, invalidateTaskCache } = require('../cache/cache');
const taskEvents = require('../events/taskEvents');

const router = express.Router();

// GET /api/tasks - Practical 4 CRUD, Practical 5 Mongoose, Practical 9 cache.
router.get('/', async (req, res, next) => {
  try {
    const cached = cache.get(KEYS.ALL_TASKS);
    if (cached) return res.json(cached);

    const tasks = await Task.find().sort({ createdAt: -1 });
    cache.set(KEYS.ALL_TASKS, tasks);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id - Practical 9 supplementary: single-task caching.
router.get('/:id', async (req, res, next) => {
  try {
    const key = KEYS.task(req.params.id);
    const cached = cache.get(key);
    if (cached) return res.json(cached);

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    cache.set(key, task);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks - Practical 10 emits an event AFTER responding.
router.post('/', validateTask, async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    invalidateTaskCache();

    console.log(`[API] Response sent at ${new Date().toISOString()}`);
    res.status(201).json(task);

    // Handled asynchronously by events/listeners.js - does not block.
    taskEvents.emit('task-created', task);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id
router.put('/:id', validateTask, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    invalidateTaskCache(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    invalidateTaskCache(req.params.id);
    res.json({ message: 'Task deleted' });

    taskEvents.emit('task-deleted', task);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
