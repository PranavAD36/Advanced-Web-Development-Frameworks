import { useState } from 'react';

// Practical 2 - controlled inputs and a toggle, both backed by useState.
function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section>
      <h1>Contact</h1>
      <p className="muted">Have a project or an opportunity in mind? Send me a message.</p>

      <form className="form card" onSubmit={(e) => e.preventDefault()}>
        <label>
          Name
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label>
          Message
          <textarea
            className="input"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short message"
          />
        </label>

        <p className="muted">{message.length} characters</p>

        <button type="button" className="btn" onClick={() => setShowPreview((v) => !v)}>
          {showPreview ? 'Hide preview' : 'Show preview'}
        </button>

        {showPreview && (
          <div className="preview">
            <strong>{name || 'Anonymous'}</strong>
            <p>{message || 'Your message will appear here.'}</p>
          </div>
        )}
      </form>
    </section>
  );
}

export default Contact;
