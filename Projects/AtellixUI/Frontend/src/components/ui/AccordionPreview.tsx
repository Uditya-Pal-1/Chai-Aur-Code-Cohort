import { useState } from 'react'

export default function AccordionPreview() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="demo-accordion">
      <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
        <span>What makes a useful component?</span>
        <span>{expanded ? '−' : '+'}</span>
      </button>
      {expanded && <p>A useful component has a clear job, sensible defaults, and accessible behavior that remains easy to customize.</p>}
    </div>
  )
}
