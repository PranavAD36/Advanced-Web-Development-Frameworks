const mongoose = require('mongoose');

// Practical 7 - user document. The password stored here is always the
// bcrypt hash, never the plain text password.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
