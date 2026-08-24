const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables from .env file
dotenv.config();

// Import middleware
const requestLogger = require('./middlewae/requestLogger');
const errorHandler = require('./middlewae/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const leaveTypeRoutes = require('./routes/leaveType');
const leaveRoutes = require('./routes/leaveRoutes');

// Import models for seeding
const Employee = require('./models/Employee');
const LeaveType = require('./models/LeaveType');

const app = express();

// ---------- Global Middleware ----------

// Enable CORS for React frontend (running on port 5173 by default with Vite)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Apply requestLogger globally - logs [METHOD] [PATH] [TIMESTAMP] for every request
app.use(requestLogger);

// ---------- Routes ----------

// Public routes (no authGuard needed)
app.use('/api/v1/auth', authRoutes);       // POST /api/v1/auth/login
app.use('/api/v1/leave-types', leaveTypeRoutes); // GET /api/v1/leave-types

// Protected routes (authGuard is applied inside leaveRoutes)
app.use('/api/v1/leaves', leaveRoutes);    // POST, GET /my, PATCH /:id/status

// ---------- Global Error Handler (must be last middleware) ----------
app.use(errorHandler);

// ---------- Seed Data Function ----------
// Seeds initial employees and leave types if collections are empty
async function seedData() {
  try {
    // Seed LeaveTypes if collection is empty
    const leaveTypeCount = await LeaveType.countDocuments();
    if (leaveTypeCount === 0) {
      await LeaveType.insertMany([
        { name: 'Casual', maxDaysPerYear: 12 },
        { name: 'Sick', maxDaysPerYear: 10 },
        { name: 'Earned', maxDaysPerYear: 15 },
        { name: 'CompOff', maxDaysPerYear: 5 }
      ]);
      console.log('✅ Leave types seeded successfully');
    }

    // Seed Employees if collection is empty
    const employeeCount = await Employee.countDocuments();
    if (employeeCount === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await Employee.insertMany([
        {
          name: 'Ronak Patel',
          email: 'ronak@techsolutions.com',
          department: 'Engineering',
          designation: 'Software Developer',
          password: hashedPassword,
          role: 'employee',
          leaveBalance: 20
        },
        {
          name: 'Priya Shah',
          email: 'priya@techsolutions.com',
          department: 'Engineering',
          designation: 'Team Lead',
          password: hashedPassword,
          role: 'manager',
          leaveBalance: 20
        },
        {
          name: 'Admin HR',
          email: 'hr@techsolutions.com',
          department: 'Human Resources',
          designation: 'HR Manager',
          password: hashedPassword,
          role: 'hr',
          leaveBalance: 20
        }
      ]);
      console.log('✅ Employees seeded successfully');
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  }
}

// ---------- MongoDB Connection & Server Start ----------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB successfully');

    // Seed initial data
    await seedData();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
