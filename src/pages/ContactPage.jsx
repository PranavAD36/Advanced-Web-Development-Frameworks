import { useState } from 'react'
import Contact from '../components/Contact'

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <main className="main-content container">
      <section className={`page-shell ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="page-card">
          <div className="section-header">
            <div>
              <p className="section-label">Contact</p>
              <h2 className="section-heading">Simple page with a working form</h2>
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setIsDarkMode((value) => !value)}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          <p className="page-copy">
            This page uses a controlled form and a second state value to make the contact section more interactive.
          </p>
        </div>

        <Contact showForm />
      </section>
    </main>
  )
}
