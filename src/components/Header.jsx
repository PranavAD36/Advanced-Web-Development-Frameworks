import React from 'react'

// Header component: displays the portfolio title and student name
// Props: name (string), themeColor (CSS color string)
export default function Header({ name, themeColor }) {
  return (
    <header id="home" className="app-header">
      <div className="container header-brand">
        <div>
          <p className="section-label">Portfolio</p>
          <h1 className="title" style={{ color: themeColor }}>Student Portfolio</h1>
        </div>
        <p className="student-name">Built by {name}</p>
      </div>
    </header>
  )
}
