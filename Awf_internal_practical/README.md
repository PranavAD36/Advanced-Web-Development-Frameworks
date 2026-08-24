# Employee Leave Management System

Exam-focused React/Vite + Express/Mongoose leave portal. Employees log in, submit leave, and view filtered history; managers/HR can update status through the API.

## Run
1. `cd backend`, copy `.env.example` to `.env`, set MongoDB URI/JWT secret, run `npm install`, then `npm run seed` and `npm start`.
2. In another terminal: `cd frontend`, `npm install`, `npm run dev`.

Demo credentials (all password `password123`): employee@techsolutions.com, manager@techsolutions.com, hr@techsolutions.com.

API: `POST /api/v1/auth/login`, `GET /api/v1/leave-types`, protected `POST /api/v1/leaves`, `GET /api/v1/leaves/my`, and manager/HR `PATCH /api/v1/leaves/:id/status` with `{ "status":"approved" }` or rejected.

Folders: `frontend/src` contains pages/components/context; `backend` contains models, middleware, seed, and server. MongoDB is required for live API operation.

Tasks are covered by reusable cards, React Router/Context/lazy HR route, request logger/auth/error middleware, real fetch calls, Mongoose references/populate, balance validation, and status filtering.
