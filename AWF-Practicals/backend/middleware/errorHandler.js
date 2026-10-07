// Practical 4 - global error handling middleware.
// It must be registered last, because Express only treats a middleware as an
// error handler when it takes four arguments (err, req, res, next).
function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
}

module.exports = errorHandler;
