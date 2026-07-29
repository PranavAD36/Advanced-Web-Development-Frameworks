import React from 'react'

const stats = [
  { value: '03', label: 'Projects', description: 'Completed portfolio and UI experiments.' },
  { value: '05', label: 'Skills', description: 'Core front-end technologies and tools.' },
  { value: '02', label: 'Learning', description: 'React patterns and UI animation workflows.' },
  { value: '01', label: 'Experience', description: 'Academic and personal development projects.' }
]

// Statistics component: displays metric cards for portfolio overview
export default function Statistics() {
  return (
    <section id="statistics" className="statistics card glass-card">
      <div className="section-header">
        <p className="section-label">Statistics</p>
        <h2 className="section-heading">Portfolio Highlights</h2>
      </div>

      <div className="stat-grid">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <span className="stat-value">{item.value}</span>
            <p className="stat-label">{item.label}</p>
            <p className="stat-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
