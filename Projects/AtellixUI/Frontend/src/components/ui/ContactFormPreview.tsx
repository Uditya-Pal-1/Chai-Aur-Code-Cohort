import { useState } from 'react'

export default function ContactFormPreview() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="demo-stack demo-contact-form"
      onChange={() => setSubmitted(false)}
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="demo-contact-fields">
        <label className="demo-field">
          <span className="demo-field-label">Name</span>
          <input name="name" autoComplete="name" placeholder="Your name" required />
        </label>
        <label className="demo-field">
          <span className="demo-field-label">Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>
      </div>
      <label className="demo-field">
        <span className="demo-field-label">What can I help with?</span>
        <select name="project" defaultValue="" required>
          <option value="" disabled>Select a project type</option>
          <option>Product design</option>
          <option>Frontend development</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="demo-field">
        <span className="demo-field-label">Project details</span>
        <textarea name="message" rows={3} minLength={12} placeholder="A little context about your project…" required />
      </label>
      <button className="demo-button demo-button-primary" type="submit">Send inquiry <span aria-hidden="true">↗</span></button>
      <span className="demo-hint" aria-live="polite">
        {submitted
          ? 'Form validated in this preview. Connect your endpoint to deliver inquiries.'
          : 'Interactive preview with native validation; no message is sent.'}
      </span>
    </form>
  )
}
