const mongoose = require('mongoose');

// Practical 5 - the Mongoose schema enforces the shape of every task
// document before it is written to MongoDB.
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

// Practical 9 - query optimization: index the field we sort by.
taskSchema.index({ createdAt: -1 });

taskSchema.pre('save', function (next) {
  if (this.title) this.title = this.title.trim();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
