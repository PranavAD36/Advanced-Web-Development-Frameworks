// Practical 1 - reusable presentational component driven by props.
function Header({ name, role, theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <header
      className="portfolio-header"
      style={{
        background: isDark ? '#1e293b' : '#eff6ff',
        color: isDark ? '#f8fafc' : '#1e293b',
      }}
    >
      <h1>{name}</h1>
      <p>{role}</p>
    </header>
  );
}

export default Header;
