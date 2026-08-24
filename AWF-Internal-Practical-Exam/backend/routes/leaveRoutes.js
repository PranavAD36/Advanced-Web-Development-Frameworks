const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');
const authGuard = require('../middlewae/authGuard');

// POST /api/v1/leaves - Apply for leave (protected)
// Task 5: Validates days <= employee.leaveBalance, creates request, deducts balance
router.post('/', authGuard, async (req, res, next) => {
  try {
    const { leaveTypeId, fromDate, toDate, days, reason } = req.body;

    // Check employee's current leave balance
    const employee = await Employee.findById(req.employee.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Validate that requested days do not exceed available balance
    if (days > employee.leaveBalance) {
      return res.status(400).json({
        success: false,
        message: `Insufficient leave balance. You have ${employee.leaveBalance} days remaining but requested ${days} days.`
      });
    }

    // Create the leave request
    const leaveRequest = await LeaveRequest.create({
      employeeId: req.employee.id,
      leaveTypeId,
      fromDate,
      toDate,
      days,
      reason
    });

    // Deduct days from employee's leave balance
    await Employee.findByIdAndUpdate(req.employee.id, {
      $inc: { leaveBalance: -days }
    });

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: leaveRequest
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/leaves/my - Return the employee's own requests (protected)
// Task 5: Uses .populate('leaveTypeId', 'name maxDaysPerYear')
router.get('/my', authGuard, async (req, res, next) => {
  try {
    const leaves = await LeaveRequest.find({ employeeId: req.employee.id })
      .populate('leaveTypeId', 'name maxDaysPerYear')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaves
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/leaves/:id/status - Manager approves/rejects a request (protected)
// Task 3: Validates status against allowed values list
router.patch('/:id/status', authGuard, async (req, res, next) => {
  try {
    const { status } = req.body;

    // Validate status against allowed values
    const ALLOWED = ['approved', 'rejected'];
    if (!ALLOWED.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${ALLOWED.join(', ')}`
      });
    }

    // Check if the user has manager or hr role
    if (req.employee.role !== 'manager' && req.employee.role !== 'hr') {
      return res.status(403).json({
        success: false,
        message: 'Only managers can approve or reject leave requests'
      });
    }

    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // If rejecting a previously pending request, refund the leave balance
    if (status === 'rejected' && leaveRequest.status === 'pending') {
      await Employee.findByIdAndUpdate(leaveRequest.employeeId, {
        $inc: { leaveBalance: leaveRequest.days }
      });
    }

    leaveRequest.status = status;
    await leaveRequest.save();

    res.status(200).json({
      success: true,
      message: `Leave request ${status} successfully`,
      data: leaveRequest
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
