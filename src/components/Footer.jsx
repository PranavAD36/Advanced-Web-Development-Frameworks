import React from 'react'

// Footer component: preserves personal contact data and adds modern footer design
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer" aria-label="Footer">
      <div className="container footer-inner">
        <div className="footer-brand-group">
          <p className="footer-brand">Pranav Dabhi</p>
          <p className="footer-copy">Designed with React and modern UI principles.</p>
        </div>

        <div className="footer-contact">
          <a className="footer-link" href="mailto:pranav.dabhi9969@gmail.com">
            <span aria-hidden="true">✉️</span>
            pranav.dabhi9969@gmail.com
          </a>
          <a className="footer-link" href="https://github.com/PranavAD36/" target="_blank" rel="noreferrer">
            <span aria-hidden="true">💻</span>
            GitHub
          </a>
          <a className="footer-link" href="https://www.linkedin.com/in/dabhi-pranav-129b05331/" target="_blank" rel="noreferrer">
            <span aria-hidden="true">🔗</span>
            LinkedIn
          </a>
        </div>

        <p className="footer-copy">© {year} Pranav Dabhi. All rights reserved.</p>
      </div>
    </footer>
  )
}
