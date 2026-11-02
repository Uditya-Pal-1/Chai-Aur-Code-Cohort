import { useState } from 'react'

export default function SplitHeroPreview() {
  const [selected, setSelected] = useState('Interfaces')

  return (
    <section className="demo-split-hero">
      <div className="demo-split-copy">
        <span className="demo-eyebrow">THE CREATIVE WORKFLOW</span>
        <h4>Make room for <em>{selected.toLowerCase()}.</em></h4>
        <p>A balanced split layout for product launches, portfolios, and focused stories.</p>
        <button className="demo-button demo-button-primary" type="button" onClick={() => setSelected(selected === 'Interfaces' ? 'Ideas' : 'Interfaces')}>Discover the approach <span aria-hidden="true">↗</span></button>
      </div>
      <div className="demo-split-art" aria-label="Abstract orange and dark layered composition"><span /><span /><span /><b>ATX<br />/ 026</b></div>
    </section>
  )
}
