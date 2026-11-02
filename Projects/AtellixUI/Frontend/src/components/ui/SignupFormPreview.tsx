import { useState } from 'react'

export default function SignupFormPreview() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <form className="demo-stack" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
      <label className="demo-field-label" htmlFor="demo-signup">Work email</label>
      <div className="demo-inline-form">
        <input
          id="demo-signup"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(event) => { setEmail(event.target.value); setSubmitted(false) }}
        />
        <button className="demo-button demo-button-primary" type="submit">Join waitlist</button>
      </div>
      <span className="demo-hint" aria-live="polite">
        {submitted ? 'You’re on the list. Thanks for your interest.' : 'A compact form with native email validation.'}
      </span>
    </form>
  )
}
