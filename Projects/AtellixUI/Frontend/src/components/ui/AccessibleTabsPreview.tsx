import { useState } from 'react'

const panels = [
  { label: 'Overview', text: 'Start with the essentials and keep the interface focused.' },
  { label: 'API', text: 'Expose small, composable props with predictable behavior.' },
  { label: 'Examples', text: 'Show realistic patterns that developers can adapt quickly.' },
]

export default function AccessibleTabsPreview() {
  const [active, setActive] = useState(0)

  return (
    <div className="demo-stack demo-tabs">
      <div className="demo-tab-list" role="tablist" aria-label="Component documentation">
        {panels.map((panel, index) => <button key={panel.label} type="button" role="tab" id={`docs-tab-${index}`} aria-controls={`docs-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const direction = event.key === 'ArrowRight' ? 1 : -1; const next = (active + direction + panels.length) % panels.length; setActive(next); document.getElementById(`docs-tab-${next}`)?.focus() } }}>{panel.label}</button>)}
      </div>
      <section className="demo-tab-panel" role="tabpanel" id={`docs-panel-${active}`} aria-labelledby={`docs-tab-${active}`} tabIndex={0}>{panels[active].text}</section>
    </div>
  )
}
