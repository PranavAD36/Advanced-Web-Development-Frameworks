const express = require('express');
const taskRoutes = require('./routes/tasks');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 5000;

// Built-in middleware for JSON body parsing
app.use(express.json());

// Custom middleware to log incoming requests
app.use(logger);

// Task routes
app.use('/api/tasks', taskRoutes);

// Global error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
