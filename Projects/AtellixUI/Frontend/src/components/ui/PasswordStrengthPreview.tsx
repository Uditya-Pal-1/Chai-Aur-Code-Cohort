import { useState } from 'react'

export default function PasswordStrengthPreview() {
  const [password, setPassword] = useState('')
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password) && /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length
  const labels = ['Enter a password', 'Needs work', 'Fair', 'Good', 'Strong']

  return (
    <div className="demo-stack">
      <label className="demo-field">
        <span className="demo-field-label">Create password</span>
        <input type="password" autoComplete="new-password" value={password} placeholder="At least 8 characters" onChange={(event) => setPassword(event.target.value)} />
      </label>
      <div className="demo-strength" aria-label={`Password strength: ${labels[password ? score : 0]}`}>
        {[1, 2, 3, 4].map((level) => <span className={level <= score ? 'is-filled' : ''} key={level} />)}
      </div>
      <span className="demo-hint" aria-live="polite">{labels[password ? score : 0]} · combine case, numbers, and symbols.</span>
    </div>
  )
}
