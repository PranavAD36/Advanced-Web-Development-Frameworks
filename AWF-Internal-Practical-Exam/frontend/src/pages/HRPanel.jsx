import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// HRPanel Component - Task 2 (Lazy-loaded, role 'hr' required)
// This component is loaded via React.lazy + Suspense in App.jsx
// The route verifies role === 'hr' before rendering
const HRPanel = () => {
  const { token, role } = useAuth();
  const [allLeaves, setAllLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verify role === 'hr' before rendering
  if (role !== 'hr') {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px', color: '#DC3545' }}>
        <h2>🚫 Access Denied</h2>
        <p>Only HR personnel can access this panel.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>📊 HR Panel</h1>
        <p style={styles.subtitle}>Employee Leave Management Dashboard</p>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>👥</span>
            <span style={styles.statLabel}>Role</span>
            <span style={styles.statValue}>HR Admin</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>📋</span>
            <span style={styles.statLabel}>Access Level</span>
            <span style={styles.statValue}>Full Access</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>🏢</span>
            <span style={styles.statLabel}>Department</span>
            <span style={styles.statValue}>Human Resources</span>
          </div>
        </div>

        <div style={styles.infoBox}>
          <h3>ℹ️ HR Panel Features</h3>
          <ul style={styles.featureList}>
            <li>View all employee leave requests across departments</li>
            <li>Generate leave utilization reports</li>
            <li>Monitor leave balances company-wide</li>
            <li>Approve or escalate leave requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 20px',
    backgroundColor: '#f0f2f5',
    minHeight: 'calc(100vh - 60px)'
  },
  content: {
    width: '100%',
    maxWidth: '700px'
  },
  heading: {
    color: '#1a237e',
    marginBottom: '4px',
    fontSize: '24px'
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  statIcon: {
    fontSize: '28px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a237e'
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  featureList: {
    paddingLeft: '20px',
    lineHeight: '2',
    color: '#555',
    fontSize: '14px'
  }
};

export default HRPanel;
