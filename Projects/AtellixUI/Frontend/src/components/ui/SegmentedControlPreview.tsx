import { useState } from 'react'

const options = ['Day', 'Week', 'Month']

export default function SegmentedControlPreview() {
  const [value, setValue] = useState(options[1])

  return (
    <div className="demo-stack">
      <div className="demo-segmented" role="group" aria-label="Chart time range">
        {options.map((option) => <button key={option} type="button" aria-pressed={value === option} className={value === option ? 'is-selected' : ''} onClick={() => setValue(option)}>{option}</button>)}
      </div>
      <div className="demo-result" aria-live="polite">Showing analytics by {value.toLowerCase()}.</div>
    </div>
  )
}
