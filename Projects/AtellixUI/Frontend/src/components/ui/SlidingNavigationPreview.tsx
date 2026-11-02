import { useState } from 'react'

export default function SlidingNavigationPreview() {
  const [drawer, setDrawer] = useState(false)

  return (
    <div className="demo-drawer-wrap">
      <button className="demo-button demo-button-primary" type="button" aria-expanded={drawer} onClick={() => setDrawer((value) => !value)}>
        {drawer ? 'Close menu' : 'Open menu'}
      </button>
      <div className={`demo-drawer ${drawer ? 'is-open' : ''}`}>
        {['Overview', 'Components', 'Documentation'].map((name) => (
          <a href="#components" key={name} onClick={() => setDrawer(false)}>{name}<span>↗</span></a>
        ))}
      </div>
    </div>
  )
}
