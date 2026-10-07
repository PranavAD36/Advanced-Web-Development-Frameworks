import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Spinner from './components/Spinner';
import { getMe } from './api/api';
import './App.css';

// Practical 8 - route based code splitting. Each page below becomes its own
// chunk and is only downloaded when the user navigates to that route.
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // Practical 7 - restore the session from the stored JWT when the app loads.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setChecking(false);
      return;
    }

    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setChecking(false));
  }, []);

  function handleAuth(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <main className="container">
        {checking ? (
          <Spinner label="Checking session..." />
        ) : (
          <Suspense fallback={<Spinner label="Loading page..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login onAuth={handleAuth} />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/tasks"
                element={user ? <Tasks user={user} /> : <Navigate to="/login" replace />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
