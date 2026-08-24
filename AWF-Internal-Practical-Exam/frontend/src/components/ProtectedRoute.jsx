import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute Component - Task 2
// Wraps routes that require authentication
// Redirects to login page if user is not authenticated
// Optionally checks for a specific role (e.g., 'hr')
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && role !== requiredRole) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px', color: '#DC3545' }}>
        <h2>🚫 Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <p>Required role: <strong>{requiredRole}</strong></p>
      </div>
    );
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
