const express = require('express');
const router = express.Router();
const LeaveType = require('../models/LeaveType');

// GET /api/v1/leave-types - Return all leave types (public endpoint)
router.get('/', async (req, res, next) => {
  try {
    const leaveTypes = await LeaveType.find();
    res.status(200).json({
      success: true,
      data: leaveTypes
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
