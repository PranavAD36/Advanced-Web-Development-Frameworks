import React from 'react'

// Hero component: main landing section with profile and CTA buttons
export default function Hero() {
  const initials = 'PD'

  return (
    <section className="hero">
      <div className="hero-grid container">
        <div className="hero-card">
          <div className="avatar" aria-hidden="true">{initials}</div>
          <div className="hero-copy">
            <p className="section-label">Pranav Dabhi</p>
            <h2 className="hero-title">Hi, I’m Pranav Dabhi. </h2>
            <p className="hero-tagline">
              Computer Engineering student specializing in polished React interfaces,
              animated layouts, and responsive design.
            </p>
            <div className="hero-buttons">
              <a className="hero-button" href="#skills">View Skills →</a>
              <a className="hero-button secondary" href="#contact">Contact Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
