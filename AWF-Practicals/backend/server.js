require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const { cache } = require('./cache/cache');

// Practical 10 - register the EventEmitter listeners once, at startup,
// before any request can emit an event.
require('./events/listeners');

const app = express();
const PORT = process.env.PORT || 5000;

// Practical 4 - global middleware pipeline
app.use(cors());
app.use(express.json());
app.use(logger);

// Practical 7 - public auth routes, protected task routes.
// The auth middleware wraps the whole task router, so every CRUD endpoint
// from Practicals 4-6, 9 and 10 now requires a valid JWT.
app.use('/api/auth', userRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// Practical 9 (supplementary) - expose cache statistics for the lab report.
app.get('/api/debug/cache', (req, res) => {
  res.json({ keys: cache.keys(), stats: cache.getStats() });
});

// Practical 4 - 404 handler, then the global error handler (always last).
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

// Practical 5 - connect to MongoDB.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
