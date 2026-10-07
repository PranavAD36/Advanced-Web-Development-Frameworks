function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <strong>Something went wrong</strong>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
