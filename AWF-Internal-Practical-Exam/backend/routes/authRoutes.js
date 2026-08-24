const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// POST /api/v1/auth/login - Authenticate employee, issue JWT token
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token with employee info
    const token = jwt.sign(
      {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Return token and employee data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department,
        designation: employee.designation,
        role: employee.role,
        leaveBalance: employee.leaveBalance
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
