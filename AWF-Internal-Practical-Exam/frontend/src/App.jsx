import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Page imports
import LoginPage from './pages/LoginPage';
import ApplyLeavePage from './pages/ApplyLeavePage';
import MyLeavesPage from './pages/MyleavesPage';

// Lazy-loaded HR Panel - Task 2
// Uses React.lazy + Suspense for code splitting
const HRPanel = lazy(() => import('./pages/HRPanel'));

// App Component - Task 2
// Configures React Router with routes: /, /apply, /my-leaves, /hr
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navigation component with links to all routes */}
        <Navbar />

        <Routes>
          {/* Public route: Login page */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected route: Apply Leave (requires authentication) */}
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <ApplyLeavePage />
              </ProtectedRoute>
            }
          />

          {/* Protected route: My Leaves (requires authentication) */}
          <Route
            path="/my-leaves"
            element={
              <ProtectedRoute>
                <MyLeavesPage />
              </ProtectedRoute>
            }
          />

          {/* Lazy-loaded, protected route: HR Panel (role 'hr' required) */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute requiredRole="hr">
                <Suspense fallback={
                  <div style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
                    <p>⏳ Loading HR Panel...</p>
                  </div>
                }>
                  <HRPanel />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
