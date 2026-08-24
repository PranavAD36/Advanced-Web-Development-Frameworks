import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LeaveRequestCard from '../components/LeaveRequestCard';

// MyLeavesPage Component - Task 1, Task 2, Task 4
// Retrieves employee's leave requests using GET /api/v1/leaves/my
// Maintains three states: leaves, loading, error
// Includes client-side status filter dropdown
const MyLeavesPage = () => {
  const { employee, token } = useAuth();

  // Three required states for API consumption - Task 4
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Client-side status filter state - Task 4
  const [filter, setFilter] = useState('All');

  // useEffect to fetch leaves when component mounts - Task 4
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        setError('');

        // GET request with token in Authorization header
        const response = await fetch('/api/v1/leaves/my', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // If server returns non-200 status, show error
        if (!response.ok) {
          throw new Error('Failed to load your leave history.');
        }

        const data = await response.json();
        setLeaves(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load your leave history.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [token]);

  // Client-side filter - filters the already-fetched array without new API request
  // Hint from exam: const filtered = leaves.filter(l => filter === 'All' || l.status === filter)
  const filtered = leaves.filter(
    (l) => filter === 'All' || l.status === filter.toLowerCase()
  );

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Display "Welcome, [Name]" from context - Task 2 */}
        <h1 style={styles.heading}>
          Welcome, {employee?.name || 'Employee'} 👋
        </h1>
        <p style={styles.subtitle}>Your Leave History</p>

        {/* Client-side status filter dropdown - Task 4 */}
        <div style={styles.filterBar}>
          <label style={styles.filterLabel}>Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <span style={styles.count}>
            Showing {filtered.length} of {leaves.length} requests
          </span>
        </div>

        {/* 1) Display loading indicator while request is in progress */}
        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Loading your leave history...</p>
          </div>
        )}

        {/* 2) Display error message if server returns non-200 */}
        {error && !loading && (
          <div style={styles.error}>
            ❌ Failed to load your leave history.
          </div>
        )}

        {/* 3) Render leaves using LeaveRequestCard after successful request */}
        {!loading && !error && filtered.length === 0 && (
          <div style={styles.empty}>
            <p>📭 No leave requests found.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={styles.cardList}>
            {filtered.map((leave) => (
              <LeaveRequestCard
                key={leave._id}
                fromDate={leave.fromDate}
                toDate={leave.toDate}
                days={leave.days}
                leaveType={leave.leaveTypeId?.name || 'Unknown'}
                reason={leave.reason}
                status={leave.status}
              />
            ))}
          </div>
        )}
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
    marginBottom: '20px'
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    flexWrap: 'wrap'
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#555'
  },
  filterSelect: {
    padding: '8px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff'
  },
  count: {
    fontSize: '13px',
    color: '#888',
    marginLeft: 'auto'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#666'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e0e0e0',
    borderTopColor: '#1a237e',
    borderRadius: '50%',
    margin: '0 auto 16px',
    animation: 'spin 1s linear infinite'
  },
  error: {
    padding: '16px',
    backgroundColor: '#ffeef0',
    color: '#DC3545',
    borderRadius: '10px',
    fontSize: '15px',
    textAlign: 'center',
    border: '1px solid #f5c6cb'
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#888',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px'
  }
};

export default MyLeavesPage;
