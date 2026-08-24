import React, { createContext, useContext, useState } from 'react';

// AuthContext - Task 2
// Holds { employee, token, role } plus login() and logout() functions
// Context state resetting on page refresh is acceptable for this exam
const AuthContext = createContext(null);

// Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component wraps the app and provides auth state globally
export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // login() - called after successful API authentication
  // Stores employee data, JWT token, and role in context state
  const login = (employeeData, authToken) => {
    setEmployee(employeeData);
    setToken(authToken);
    setRole(employeeData.role);
  };

  // logout() - clears all auth state
  const logout = () => {
    setEmployee(null);
    setToken(null);
    setRole(null);
  };

  // Value object provided to all consumers of this context
  const value = {
    employee,
    token,
    role,
    login,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
