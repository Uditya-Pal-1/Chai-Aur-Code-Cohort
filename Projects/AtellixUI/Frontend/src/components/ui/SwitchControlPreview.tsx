import { useState } from 'react'

export default function SwitchControlPreview() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="demo-stack">
      <label className="demo-switch-row">
        <span><strong>Reduce motion</strong><small>Use fewer interface animations.</small></span>
        <input type="checkbox" role="switch" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
      </label>
      <span className="demo-hint" aria-live="polite">Reduced motion is {enabled ? 'enabled' : 'disabled'}.</span>
    </div>
  )
}
