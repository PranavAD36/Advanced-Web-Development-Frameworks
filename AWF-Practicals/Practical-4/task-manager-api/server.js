require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory task storage
let tasks = [
  { id: 1, title: 'Sample Task', description: 'This is a sample task', completed: false },
  { id: 2, title: 'Another Task', description: 'Description here', completed: true }
];
let nextId = 3;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// GET /tasks — get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks — create task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task = { id: nextId++, title, description: description || '', completed: false };
    tasks.push(task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id — update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    Object.assign(task, req.body, { id: task.id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id — delete task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler (last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
