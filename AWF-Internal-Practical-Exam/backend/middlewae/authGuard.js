const jwt = require('jsonwebtoken');

// authGuard Middleware - Task 3
// Validates Bearer token from Authorization header
// Returns 401 if token is missing or invalid
const authGuard = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and has Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verify the token using JWT_SECRET from environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach employee data to request object for downstream use
    req.employee = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = authGuard;
