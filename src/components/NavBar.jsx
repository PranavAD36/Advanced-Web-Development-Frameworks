import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <ul className="nav-list">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </nav>
  )
}
