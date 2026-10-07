// Practical 4 - request logging middleware.
// Every request passes through here before reaching any route.
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
