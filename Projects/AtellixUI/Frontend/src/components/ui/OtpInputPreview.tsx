import { useState } from 'react'

export default function OtpInputPreview() {
  const [code, setCode] = useState('')
  const verified = code.length === 6

  return (
    <div className="demo-stack">
      <label className="demo-field">
        <span className="demo-field-label">Verification code</span>
        <input
          className="demo-otp-input"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          pattern="[0-9]{6}"
          placeholder="••••••"
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
          aria-describedby="otp-feedback"
        />
      </label>
      <span id="otp-feedback" className="demo-hint" aria-live="polite">
        {verified ? 'Code entered. Connect your verification endpoint to confirm it.' : `${6 - code.length} digits remaining.`}
      </span>
    </div>
  )
}
