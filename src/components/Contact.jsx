import { useState } from 'react'

export default function Contact({ showForm = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Thank you ${formData.name || 'there'} for your message.`)
  }

  return (
    <section id="contact" className="contact card glass-card">
      <div className="section-header">
        <p className="section-label">Contact</p>
        <h2 className="section-heading">Let’s work together</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-panel">
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <div>
              <p>Email</p>
              <a className="contact-link" href="mailto:pranav.dabhi9969@gmail.com">pranav.dabhi9969@gmail.com</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <p>Phone</p>
              <a className="contact-link" href="tel:+919876543210">+91 97272 86699</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <p>Location</p>
              <p>Morbi, Gujarat, India</p>
            </div>
          </div>
        </div>

        <div className="contact-panel contact-actions">
          {showForm ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row form-row--single">
                <textarea
                  className="textarea-field"
                  name="message"
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button className="submit-button" type="submit">Send Message</button>
            </form>
          ) : (
            <>
              <a className="contact-button" href="mailto:pranav.dabhi9969@gmail.com">Email</a>
              <a className="contact-button" href="https://github.com/PranavAD36/" target="_blank" rel="noreferrer">GitHub</a>
              <a className="contact-button" href="https://www.linkedin.com/in/dabhi-pranav-129b05331/" target="_blank" rel="noreferrer">LinkedIn</a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
