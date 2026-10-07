import { Link, NavLink } from 'react-router-dom';

// Practical 2 - navigation bar with React Router links (no full page reload).
function NavBar({ user, onLogout }) {
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        Pranav Dabhi<span className="brand-dot">.</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
          Tasks
        </NavLink>
      </nav>

      <div className="nav-auth">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button type="button" className="btn btn-ghost" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
