export default function NotFoundPage() {
  return (
    <main className="main-content container">
      <section className="page-shell">
        <div className="page-card not-found-card">
          <p className="section-label">404</p>
          <h2 className="section-heading">Page not found</h2>
          <p className="page-copy">
            The route you requested does not exist. Use the navigation above to visit the available pages.
          </p>
        </div>
      </section>
    </main>
  )
}
