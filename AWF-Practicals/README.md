# AWF (ITUE301) - Practicals 1 to 10

Single full-stack project that covers every practical in the ITUE301 practical list
(2026-27 ODD). Instead of one folder per practical, everything lives directly in
this AWF-Practicals folder: a React (Vite) frontend and an Express + MongoDB backend.

## Folder structure

```
AWF-Practicals/
  frontend/            React + Vite single page application
    src/components/    reusable UI pieces (Practical 1)
    src/pages/         route level pages (Practicals 1, 2, 3, 6, 7)
    src/api/api.js     single place for every API call
  backend/             Express + MongoDB REST API
    routes/            users (auth) and tasks (CRUD)
    models/            Mongoose schemas
    middleware/        logger, auth, validation, error handler
    cache/             in-memory cache (Practical 9)
    events/            EventEmitter + listeners (Practical 10)
```

## Practical wise mapping

| # | Practical | Where it is implemented |
|---|-----------|-------------------------|
| 1 | Introduction to React and Component Architecture | `frontend/src/components/Header, About, Skills, Footer.jsx` composed in `frontend/src/pages/Home.jsx` (props are passed into Header and Skills) |
| 2 | State Management and Routing in React | React Router routes in `frontend/src/App.jsx`, NavBar in `frontend/src/components/NavBar.jsx`, `useState` in `frontend/src/pages/Contact.jsx`, custom 404 page |
| 3 | API Integration and Data Rendering in React | `frontend/src/pages/Projects.jsx` fetches the GitHub REST API with `useEffect`, shows a spinner (`Spinner.jsx`) and an error state with retry (`ErrorMessage.jsx`) |
| 4 | Building a RESTful API with Node.js and Express | `backend/server.js`, `backend/routes/tasks.js`, logging middleware `backend/middleware/logger.js`, global error handler `backend/middleware/errorHandler.js` |
| 5 | MongoDB Integration and Schema Design with Mongoose | `backend/models/Task.js` and `backend/models/User.js`, MongoDB connection in `backend/server.js` |
| 6 | Full Stack Integration (React + Node + MongoDB) | `frontend/src/pages/Tasks.jsx` + `frontend/src/api/api.js` call the backend CRUD endpoints |
| 7 | Authentication and Middleware Pipeline | `backend/routes/users.js` (register/login/me), `backend/middleware/auth.js` (JWT), `backend/middleware/validation.js`, `frontend/src/pages/Login.jsx` and `Register.jsx` |
| 8 | Performance Optimization and Lazy Loading in React | `React.lazy` + `Suspense` route splitting in `frontend/src/App.jsx` |
| 9 | In-Memory Caching and Query Optimization | `backend/cache/cache.js` (node-cache, 60s TTL) used in `backend/routes/tasks.js`, cache invalidation on writes, `/api/debug/cache` stats endpoint, index on `createdAt` in `Task.js` |
| 10 | Asynchronous Processing with Event-Driven Architecture | `backend/events/taskEvents.js` (EventEmitter) and `backend/events/listeners.js`, emitted after the response in `backend/routes/tasks.js` |

## Setup

Requirements: Node.js 18+, npm, and MongoDB running locally (or a MongoDB Atlas URI).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit .env if needed
npm run dev               # http://localhost:5000
```

`.env` values:

```
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=change_this_to_a_long_random_secret
PORT=5000
CACHE_TTL=60
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

The frontend expects the API at `http://localhost:5000/api`. Override it with a
`VITE_API_URL` environment variable if your backend runs elsewhere.

## API endpoints

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/auth/register` | No | Create a user (password hashed with bcrypt) |
| POST | `/api/auth/login` | No | Login and receive a JWT |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/tasks` | Yes | List tasks (served from cache when available) |
| GET | `/api/tasks/:id` | Yes | Single task (cached) |
| POST | `/api/tasks` | Yes | Create a task (emits `task-created`) |
| PUT | `/api/tasks/:id` | Yes | Update a task (invalidates cache) |
| DELETE | `/api/tasks/:id` | Yes | Delete a task (emits `task-deleted`) |
| GET | `/api/debug/cache` | No | Cache keys and hit/miss statistics |

## Notes for the lab journal

- The EventEmitter listener runs **after** `res.json()` is sent. Compare the
  `[API] Response sent at ...` timestamp with the handler timestamp in the console
  to show that the response is not blocked by the notification work.
- To measure the caching win, record `GET /api/tasks` response times in Postman
  with the cache enabled, then temporarily comment out the cache check in
  `backend/routes/tasks.js` and record three more readings.
- For Practical 8, run `npm run build` before and after adding `React.lazy` to see
  the separate chunk files created for each route.
