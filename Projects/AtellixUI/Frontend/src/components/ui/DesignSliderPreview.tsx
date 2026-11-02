import { useState } from 'react'

export default function DesignSliderPreview() {
  const [radius, setRadius] = useState(16)
  const [spacing, setSpacing] = useState(20)

  return (
    <div className="demo-stack demo-design-slider">
      <div className="demo-slider-preview" style={{ borderRadius: `${radius}px`, padding: `${spacing}px` }}>
        <span className="demo-slider-preview-mark" aria-hidden="true">A</span>
        <div>
          <strong>Surface preview</strong>
          <span>Adjust shape and space</span>
        </div>
      </div>
      <label className="demo-range-control">
        <span>Corner radius <output>{radius}px</output></span>
        <input type="range" min="4" max="32" step="1" value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
      </label>
      <label className="demo-range-control">
        <span>Inner spacing <output>{spacing}px</output></span>
        <input type="range" min="8" max="36" step="2" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} />
      </label>
      <span className="demo-hint">Keyboard-accessible range inputs update the preview live.</span>
    </div>
  )
}
