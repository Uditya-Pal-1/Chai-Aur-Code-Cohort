import { useMemo, useState } from 'react'

export default function DateRangePreview() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const range = useMemo(() => {
    if (!start || !end) return null
    const days = Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000)
    return Number.isFinite(days) ? days : null
  }, [start, end])

  return (
    <div className="demo-stack">
      <div className="demo-date-range">
        <label className="demo-field"><span className="demo-field-label">From</span><input type="date" value={start} onChange={(event) => setStart(event.target.value)} /></label>
        <label className="demo-field"><span className="demo-field-label">To</span><input type="date" min={start || undefined} value={end} onChange={(event) => setEnd(event.target.value)} /></label>
      </div>
      <span className="demo-hint" aria-live="polite">
        {range === null ? 'Choose a start and end date.' : range < 0 ? 'End date must be after the start date.' : `${range + 1} days selected.`}
      </span>
    </div>
  )
}
