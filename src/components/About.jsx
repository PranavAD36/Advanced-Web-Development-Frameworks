import React from 'react'

export default function About() {
  return (
    <section id="about" className="about card glass-card">
      <div className="section-header">
        <p className="section-label">About Me</p>
        <h2 className="section-heading">Computer Engineering Student</h2>
      </div>

      <p className="about-copy">
        I am a Computer Engineering student focused on building modern web
        applications with React, JavaScript, and clean user interface design.
        I enjoy creating responsive solutions that look professional and
        perform smoothly across devices.
      </p>
    
      <div className="about-grid">
        <div className="about-item">
          <span>Education</span>
          <strong>B.Tech in Computer Engineering</strong>
        </div>
        <div className="about-item">
          <span>Branch</span>
          <strong>Computer Engineering</strong>
        </div>
        <div className="about-item">
          <span>Semester</span>
          <strong>5th Semester</strong>
        </div>
        <div className="about-item">
          <span>University</span>
          <strong>Charusat University</strong>
        </div>
        <div className="about-item">
          <span>Career Goal</span>
          <strong>Build intuitive back-end experiences and learn full-stack tools.</strong>
        </div>
      </div>
    </section>
  )
}
