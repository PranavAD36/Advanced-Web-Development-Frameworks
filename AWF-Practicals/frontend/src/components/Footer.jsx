function Footer({ contact, github }) {
  return (
    <footer className="portfolio-footer">
      <p>
        Let's connect:{' '}
        <a href={`mailto:${contact}`}>{contact}</a>
      </p>
      <p>
        <a href={github} target="_blank" rel="noreferrer">
          github.com/PranavAD36
        </a>
      </p>
      <p className="muted">&copy; {new Date().getFullYear()} Pranav Dabhi. Built with React and Vite.</p>
    </footer>
  );
}

export default Footer;