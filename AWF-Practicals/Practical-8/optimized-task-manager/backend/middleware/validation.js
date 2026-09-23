const validateTask = (req, res, next) => {
  const { title } = req.body;
  const errors = [];
  if (!title || title.trim() === '') errors.push('Title is required');
  if (req.body.priority && !['low', 'medium', 'high'].includes(req.body.priority)) {
    errors.push('Priority must be low, medium, or high');
  }
  if (errors.length > 0) return res.status(400).json({ error: errors.join(', ') });
  next();
};

const registerValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name || name.trim() === '') errors.push('Name is required');
  if (!email || !email.includes('@')) errors.push('Valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  if (errors.length > 0) return res.status(400).json({ error: errors.join(', ') });
  next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (errors.length > 0) return res.status(400).json({ error: errors.join(', ') });
  next();
};

module.exports = { validateTask, registerValidation, loginValidation };
