// Practical 7 - server-side input validation.
// Requests are rejected before they ever reach a controller.

function validateTask(req, res, next) {
  const errors = [];
  const { title, priority } = req.body;

  if (!title || String(title).trim() === '') errors.push('Title is required');
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (errors.length > 0) return res.status(400).json({ error: errors.join(', ') });
  next();
}

function registerValidation(req, res, next) {
  const errors = [];
  const { name, email, password } = req.body;

  if (!name || String(name).trim() === '') errors.push('Name is required');
  if (!email || !String(email).includes('@')) errors.push('Valid email is required');
  if (!password || String(password).length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) return res.status(400).json({ error: errors.join(', ') });
  next();
}

function loginValidation(req, res, next) {
  const errors = [];
  const { email, password } = req.body;

  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) return res.status(400).json({ error: errors.join(', ') });
  next();
}

module.exports = { validateTask, registerValidation, loginValidation };
