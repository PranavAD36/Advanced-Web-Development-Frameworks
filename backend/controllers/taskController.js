const tasks = require('../data/tasks');

function getAllTasks(req, res) {
  res.status(200).json(tasks);
}

function getTaskById(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(task);
}
    
function createTask(req, res) {
  const { title, description, completed } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title,
    description,
    completed: typeof completed === 'boolean' ? completed : false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, completed } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title,
    description,
    completed: typeof completed === 'boolean' ? completed : tasks[taskIndex].completed,
  };

  tasks[taskIndex] = updatedTask;
  res.status(200).json(updatedTask);
}

function deleteTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
