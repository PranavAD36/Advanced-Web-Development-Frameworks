import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// ApplyLeavePage Component - Task 1 & Task 2
// Leave application form with: leave type, from date, to date, reason
// Uses useState to manage form data
// At least two state values used meaningfully: selectedLeaveType, computedDays
const ApplyLeavePage = () => {
  const { token, employee } = useAuth();

  // State for leave types fetched from API
  const [leaveTypes, setLeaveTypes] = useState([]);

  // Form state managed with useState - Task 2
  const [leaveTypeId, setLeaveTypeId] = useState('');   // Selected leave type (state value 1)
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [days, setDays] = useState(0);                   // Computed number of days (state value 2)

  // Form feedback states
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch leave types from public API on component mount
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await fetch('/api/v1/leave-types');
        const data = await response.json();
        if (data.success) {
          setLeaveTypes(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch leave types:', err);
      }
    };
    fetchLeaveTypes();
  }, []);

  // Compute number of days whenever fromDate or toDate changes
  // This is a meaningful use of state (computed days)
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both dates
      setDays(diffDays > 0 ? diffDays : 0);
    } else {
      setDays(0);
    }
  }, [fromDate, toDate]);

  // Handle form submission - POST /api/v1/leaves
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    // Client-side validation
    if (!leaveTypeId || !fromDate || !toDate) {
      setError('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    if (days <= 0) {
      setError('To date must be on or after From date.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/v1/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          leaveTypeId,
          fromDate,
          toDate,
          days,
          reason
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit leave request');
      }

      setMessage('✅ Leave request submitted successfully!');
      // Reset form
      setLeaveTypeId('');
      setFromDate('');
      setToDate('');
      setReason('');
      setDays(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 Apply for Leave</h1>
        <p style={styles.subtitle}>
          Available Balance: <strong>{employee?.leaveBalance ?? 'N/A'} days</strong>
        </p>

        {/* Success message */}
        {message && <div style={styles.success}>{message}</div>}

        {/* Error message */}
        {error && <div style={styles.error}>❌ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Leave Type selector - meaningful state value 1 */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Leave Type *</label>
            <select
              value={leaveTypeId}
              onChange={(e) => setLeaveTypeId(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">-- Select Leave Type --</option>
              {leaveTypes.map((lt) => (
                <option key={lt._id} value={lt._id}>
                  {lt.name} (Max: {lt.maxDaysPerYear} days/year)
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>From Date *</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* To Date */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>To Date *</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Computed days display - meaningful state value 2 */}
          {days > 0 && (
            <div style={styles.daysDisplay}>
              📅 Number of days: <strong>{days}</strong>
            </div>
          )}

          {/* Reason */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave (optional, max 500 chars)"
              maxLength={500}
              rows={3}
              style={styles.textarea}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              ...styles.button,
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </form>
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
  card: {
    backgroundColor: '#fff',
    padding: '36px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '520px',
    height: 'fit-content'
  },
  heading: {
    color: '#1a237e',
    marginBottom: '4px',
    fontSize: '22px'
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px'
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
    outline: 'none'
  },
  select: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff'
  },
  textarea: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  daysDisplay: {
    padding: '10px 16px',
    backgroundColor: '#e3f2fd',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1565c0'
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
  success: {
    padding: '10px 14px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '12px',
    border: '1px solid #c8e6c9'
  },
  error: {
    padding: '10px 14px',
    backgroundColor: '#ffeef0',
    color: '#DC3545',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '12px',
    border: '1px solid #f5c6cb'
  }
};

export default ApplyLeavePage;
