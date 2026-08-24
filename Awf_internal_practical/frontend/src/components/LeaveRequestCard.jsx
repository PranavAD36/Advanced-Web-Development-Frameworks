export default function LeaveRequestCard({ fromDate, toDate, days, leaveType, reason, status }) {
  return <article><p>{fromDate} to {toDate} ({days} days)</p><p>Type: {leaveType?.name || leaveType}</p><p>Reason: {reason || "-"}</p><span className={`badge ${status}`}>{status}</span></article>;
}
