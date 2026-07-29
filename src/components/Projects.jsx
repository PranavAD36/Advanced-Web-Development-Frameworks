import React from 'react'

const projects = [
  {
    title: 'Portfolio Landing Page',
    description: 'A responsive portfolio website with glassmorphism styling, animated buttons, and clean UI patterns.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'React Task Tracker',
    description: 'A task management app built with React components, state management, and polished interactions.',
    tech: ['React', 'Vite', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Vite Weather Dashboard',
    description: 'A weather dashboard prototype using fast Vite bundling and clean card-based interface design.',
    tech: ['Vite', 'API', 'CSS'],
    demoUrl: '#',
    githubUrl: '#'
  }
]

// Projects component: displays project cards with demo and GitHub actions
export default function Projects() {
  return (
    <section id="projects" className="projects card glass-card">
      <div className="section-header">
        <p className="section-label">Projects</p>
        <h2 className="section-heading">Selected Work</h2>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-meta">
              {project.tech.map((item) => (
                <span key={item} className="badge">{item}</span>
              ))}
            </div>
            <div className="project-actions">
              <a href={project.demoUrl} className="project-action" target="_blank" rel="noreferrer">Live Demo</a>
              <a href={project.githubUrl} className="project-action" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
