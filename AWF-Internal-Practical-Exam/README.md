# Employee Leave Management System (SET C)

**ITUE301: Advanced Web Development Frameworks**  
CSPIT, CHARUSAT | Open-Book Practical Examination | AY 2026–27

## Project Overview

TechSolutions Pvt Ltd Employee Leave Management Portal where employees apply for leave, managers approve/reject, and HR generates reports.

## Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Express.js
- **Database:** MongoDB with Mongoose

## Folder Structure

```
├── frontend/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable components (LeaveRequestCard, Navbar, ProtectedRoute)
│   │   ├── context/       # AuthContext for global auth state
│   │   ├── pages/         # Page components (LoginPage, ApplyLeavePage, MyLeavesPage, HRPanel)
│   │   ├── App.jsx        # Main app with routing
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/           # Express.js backend
│   ├── models/            # Mongoose schemas (Employee, LeaveType, LeaveRequest)
│   ├── routes/            # API routes (auth, leaves, leave-types)
│   ├── middlewae/         # Middleware (authGuard, requestLogger, errorHandler)
│   ├── server.js          # Main server file
│   ├── .env.example       # Environment variables template
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v18+)
- MongoDB (running locally or Atlas connection string)

## MongoDB Setup

1. Install MongoDB locally or create a MongoDB Atlas cluster.
2. Copy `.env.example` to `.env` in the `backend/` directory.
3. Update the `MONGO_URI` in `.env` with your MongoDB connection string.

Example:
```
MONGO_URI=mongodb://localhost:27017/leave_management
PORT=5000
JWT_SECRET=your_secret_key
```

## Backend Setup & Run

```bash
cd backend
npm install
node server.js     # or: npm start
```

The backend server starts on `http://localhost:5000`.  
On first run, it automatically seeds:
- **3 Employees:** Ronak (employee), Priya (manager), Admin HR (hr)
- **4 Leave Types:** Casual, Sick, Earned, CompOff
- **Password for all:** `password123`

## Frontend Setup & Run

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/v1/auth/login` | Authenticate employee, issue token | Public |
| GET | `/api/v1/leave-types` | Return all leave types | Public |
| POST | `/api/v1/leaves` | Apply for leave | Protected |
| GET | `/api/v1/leaves/my` | Return employee's own requests | Protected |
| PATCH | `/api/v1/leaves/:id/status` | Approve/reject leave request | Protected (Manager) |

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Employee | ronak@techsolutions.com | password123 |
| Manager | priya@techsolutions.com | password123 |
| HR | hr@techsolutions.com | password123 |
