import React from 'react';

// LeaveRequestCard Component - Task 1
// Reusable component that accepts props and renders leave request details
// Props: fromDate, toDate, days, leaveType, reason, status
const LeaveRequestCard = ({ fromDate, toDate, days, leaveType, reason, status }) => {
  // Status colour mapping for the pill badge
  const colors = {
    pending: '#FFC107',
    approved: '#28A745',
    rejected: '#DC3545',
    cancelled: '#6C757D'
  };

  // Text colour for better contrast on coloured backgrounds
  const textColors = {
    pending: '#000',
    approved: '#fff',
    rejected: '#fff',
    cancelled: '#fff'
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.leaveType}>{leaveType || 'N/A'}</span>
        {/* Status pill badge with colour based on status */}
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: colors[status] || '#6C757D',
            color: textColors[status] || '#fff'
          }}
        >
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
        </span>
      </div>

      <div style={styles.cardBody}>
        <div style={styles.row}>
          <div style={styles.field}>
            <span style={styles.label}>From</span>
            <span style={styles.value}>{formatDate(fromDate)}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>To</span>
            <span style={styles.value}>{formatDate(toDate)}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Days</span>
            <span style={styles.value}>{days}</span>
          </div>
        </div>

        <div style={styles.reasonSection}>
          <span style={styles.label}>Reason</span>
          <p style={styles.reasonText}>{reason || 'No reason provided'}</p>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the card component
const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '0',
    marginBottom: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0'
  },
  leaveType: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#333'
  },
  statusBadge: {
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  cardBody: {
    padding: '16px 20px'
  },
  row: {
    display: 'flex',
    gap: '24px',
    marginBottom: '12px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  label: {
    fontSize: '12px',
    color: '#888',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  value: {
    fontSize: '15px',
    color: '#333',
    fontWeight: '500'
  },
  reasonSection: {
    marginTop: '8px'
  },
  reasonText: {
    fontSize: '14px',
    color: '#555',
    margin: '4px 0 0 0',
    lineHeight: '1.4'
  }
};

export default LeaveRequestCard;
