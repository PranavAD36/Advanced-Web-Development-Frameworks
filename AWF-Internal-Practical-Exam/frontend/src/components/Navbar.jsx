import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navbar Component - Task 2
// Navigation component containing links to all routes
// Uses React Router <Link> for navigation without full-page reload
const Navbar = () => {
  const { isAuthenticated, employee, role, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout: clear auth state and navigate to login
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>📋</span>
        <span style={styles.title}>TechSolutions Leave Portal</span>
      </div>

      <div style={styles.links}>
        {!isAuthenticated ? (
          <Link to="/" style={styles.link}>Login</Link>
        ) : (
          <>
            <Link to="/apply" style={styles.link}>Apply Leave</Link>
            <Link to="/my-leaves" style={styles.link}>My Leaves</Link>
            {/* Show HR Panel link only if user has 'hr' role */}
            {role === 'hr' && (
              <Link to="/hr" style={styles.link}>HR Panel</Link>
            )}
            <span style={styles.userName}>
              👤 {employee?.name}
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1a237e',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logo: {
    fontSize: '24px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  link: {
    color: '#e8eaf6',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.2s'
  },
  userName: {
    fontSize: '14px',
    color: '#c5cae9',
    marginLeft: '8px'
  },
  logoutBtn: {
    padding: '6px 16px',
    backgroundColor: '#ef5350',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default Navbar;
