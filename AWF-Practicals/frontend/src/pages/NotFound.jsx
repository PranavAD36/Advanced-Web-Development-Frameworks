import { Link } from 'react-router-dom';

// Practical 2 (supplementary) - custom 404 route component.
function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link className="btn" to="/">
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
