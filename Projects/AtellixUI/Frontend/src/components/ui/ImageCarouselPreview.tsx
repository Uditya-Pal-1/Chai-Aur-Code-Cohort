import { useState } from 'react'

const slides = ['Structure', 'Contrast', 'Balance']

export default function ImageCarouselPreview() {
  const [slide, setSlide] = useState(0)

  return (
    <div className="demo-carousel">
      <div className={`demo-slide slide-${slide}`}>
        <strong>{slides[slide]}</strong>
      </div>
      <div className="demo-actions">
        <button className="demo-button" type="button" onClick={() => setSlide((value) => (value + slides.length - 1) % slides.length)}>← Previous</button>
        <span>{slide + 1} / {slides.length}</span>
        <button className="demo-button demo-button-primary" type="button" onClick={() => setSlide((value) => (value + 1) % slides.length)}>Next →</button>
      </div>
    </div>
  )
}
