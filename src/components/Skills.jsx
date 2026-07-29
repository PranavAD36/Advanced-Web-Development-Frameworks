import React from 'react'

const iconMap = {
  HTML: '🌐',
  CSS: '🎨',
  JavaScript: '✨',
  React: '⚛️',
  Vite: '🚀'
}

// Skills component: receives skillList prop and renders dynamically
export default function Skills({ skillList }) {
  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <p className="section-label">Skills</p>
        <h2 className="section-heading">Technical Toolkit</h2>
      </div>

      <ul className="skills-grid">
        {skillList && skillList.map((skill) => (
          <li key={skill} className="skill-card">
            <span className="skill-icon" aria-hidden="true">{iconMap[skill] || '🛠'}</span>
            <div className="skill-name">{skill}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
