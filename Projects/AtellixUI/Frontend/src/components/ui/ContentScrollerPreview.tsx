import { useRef } from 'react'

const cards = [
  { title: 'Color systems', detail: 'Build a palette with accessible contrast.' },
  { title: 'Type scales', detail: 'Create a clear, responsive hierarchy.' },
  { title: 'Spacing', detail: 'Keep layouts consistent across screens.' },
  { title: 'Components', detail: 'Turn repeated patterns into a system.' },
]

export default function ContentScrollerPreview() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: 'auto',
    })
  }

  return (
    <div className="demo-content-scroller">
      <div className="demo-scroller-heading">
        <span>Design system essentials</span>
        <div className="demo-scroller-controls">
          <button className="demo-button" type="button" aria-label="Scroll content backward" onClick={() => scroll(-1)}>←</button>
          <button className="demo-button" type="button" aria-label="Scroll content forward" onClick={() => scroll(1)}>→</button>
        </div>
      </div>
      <div className="demo-scroller-track" ref={trackRef} role="region" tabIndex={0} aria-label="Design system topics">
        {cards.map((card, index) => (
          <article className="demo-scroller-card" key={card.title}>
            <span>0{index + 1}</span>
            <strong>{card.title}</strong>
            <p>{card.detail}</p>
          </article>
        ))}
      </div>
      <span className="demo-hint">Swipe, scroll, or use the arrow controls to browse.</span>
    </div>
  )
}
