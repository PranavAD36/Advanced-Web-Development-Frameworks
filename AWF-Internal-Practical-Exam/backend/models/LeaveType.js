const mongoose = require('mongoose');

// LeaveType Schema - Task 5
const leaveTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Leave type name is required'],
    enum: {
      values: ['Casual', 'Sick', 'Earned', 'CompOff'],
      message: '{VALUE} is not a valid leave type. Allowed: Casual, Sick, Earned, CompOff'
    }
  },
  maxDaysPerYear: {
    type: Number,
    required: [true, 'Max days per year is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
