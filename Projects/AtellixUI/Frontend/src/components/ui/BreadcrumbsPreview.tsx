import { useState } from 'react'

const trail = ['Workspace', 'Design system', 'Components']

export default function BreadcrumbsPreview() {
  const [current, setCurrent] = useState(2)

  return (
    <div className="demo-stack">
      <nav className="demo-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {trail.slice(0, current + 1).map((item, index) => (
            <li key={item}>
              {index === current
                ? <span aria-current="page">{item}</span>
                : <button type="button" onClick={() => setCurrent(index)}>{item}</button>}
            </li>
          ))}
        </ol>
      </nav>
      <span className="demo-hint" aria-live="polite">Current location: {trail[current]}</span>
      {current < trail.length - 1 && <button className="demo-button" type="button" onClick={() => setCurrent((value) => value + 1)}>Go deeper</button>}
    </div>
  )
}
