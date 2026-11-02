import { useState } from 'react'

const features = [
  { number: '01', title: 'Clear foundations', text: 'A practical token layer keeps every surface aligned.' },
  { number: '02', title: 'Useful by default', text: 'Focused interactions make common patterns feel natural.' },
  { number: '03', title: 'Ready to adapt', text: 'Small, understandable parts are easy to make your own.' },
]

export default function FeatureGridPreview() {
  const [selected, setSelected] = useState('01')

  return (
    <div className="demo-feature-grid">
      {features.map((feature) => <button className={`demo-feature-tile ${selected === feature.number ? 'is-selected' : ''}`} type="button" key={feature.number} onClick={() => setSelected(feature.number)}><span>{feature.number} / PRINCIPLE</span><strong>{feature.title}</strong><p>{feature.text}</p><i aria-hidden="true">↗</i></button>)}
      <span className="demo-hint">Selected principle: {selected}</span>
    </div>
  )
}
