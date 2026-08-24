import Projects from '../components/Projects'

export default function ProjectsPage() {
  return (
    <main className="main-content container">
      <section className="page-shell">
        <div className="page-card">
          <p className="section-label">Projects</p>
          <h2 className="section-heading">Practical work and learning apps</h2>
          <p className="page-copy">
            This page keeps the portfolio projects in one place while staying easy to expand for future AWF practicals.
          </p>
        </div>
        <Projects />
      </section>
    </main>
  )
}
