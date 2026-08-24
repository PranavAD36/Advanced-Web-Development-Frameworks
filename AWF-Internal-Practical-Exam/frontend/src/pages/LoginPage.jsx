import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// LoginPage Component - Task 1 & Task 2
// Authenticates employee via POST /api/v1/auth/login and stores response in AuthContext
const LoginPage = () => {
  // useState to manage form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle form submission - calls backend login API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // POST request to authenticate employee
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store employee data and token in AuthContext
      login(data.employee, data.token);

      // Navigate to my-leaves page after successful login
      navigate('/my-leaves');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🔐 Employee Login</h1>
        <p style={styles.subtitle}>TechSolutions Leave Management Portal</p>

        {/* Error message display */}
        {error && (
          <div style={styles.error}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.hint}>
          <p style={{ fontWeight: '600', marginBottom: '6px' }}>Demo Credentials:</p>
          <p>Employee: <code>ronak@techsolutions.com</code></p>
          <p>Manager: <code>priya@techsolutions.com</code></p>
          <p>HR: <code>hr@techsolutions.com</code></p>
          <p>Password for all: <code>password123</code></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#f0f2f5',
    padding: '20px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px'
  },
  heading: {
    textAlign: 'center',
    color: '#1a237e',
    marginBottom: '4px',
    fontSize: '24px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: '24px',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    padding: '12px',
    backgroundColor: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px'
  },
  error: {
    padding: '10px 14px',
    backgroundColor: '#ffeef0',
    color: '#DC3545',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '12px',
    border: '1px solid #f5c6cb'
  },
  hint: {
    marginTop: '24px',
    padding: '12px 16px',
    backgroundColor: '#e8eaf6',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#555',
    lineHeight: '1.6'
  }
};

export default LoginPage;
