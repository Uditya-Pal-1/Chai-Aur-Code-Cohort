import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle: string
  tag: string
  accentColor: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Atomic Design Tokens',
    subtitle: 'Unified CSS variables controlling spacing, radii, typography, and orange radiance.',
    tag: 'FOUNDATION',
    accentColor: '#ff8a3d',
  },
  {
    id: 2,
    title: 'Restrained Micro-interactions',
    subtitle: 'Spring physics powered by Framer Motion respecting reduced-motion user preferences.',
    tag: 'MOTION',
    accentColor: '#f5660d',
  },
  {
    id: 3,
    title: 'Live Sandpack Workspace',
    subtitle: 'Full in-browser React IDE allowing instantaneous TSX modification and zero-config previews.',
    tag: 'STUDIO',
    accentColor: '#d94e00',
  },
]

export default function ModernCarouselPreview() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [autoplay])

  const next = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="demo-stack demo-carousel-container">
      <div className="demo-carousel-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="demo-carousel-card"
            style={{ '--carousel-accent': slides[current].accentColor } as React.CSSProperties}
          >
            <div className="demo-carousel-pill-row">
              <span className="demo-badge demo-badge-primary">{slides[current].tag}</span>
              <span className="demo-carousel-counter">
                0{slides[current].id} / 0{slides.length}
              </span>
            </div>
            <h3>{slides[current].title}</h3>
            <p>{slides[current].subtitle}</p>
            <div className="demo-carousel-badge">
              <Sparkles size={14} color="#ff8a3d" />
              <span>Production Primitive</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className="demo-carousel-arrow is-left"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="demo-carousel-arrow is-right"
          onClick={next}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="demo-carousel-controls">
        <div className="demo-carousel-indicators" role="tablist" aria-label="Slide selectors">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`demo-carousel-dot ${index === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Slide ${index + 1}`}
              aria-selected={index === current}
            />
          ))}
        </div>
        <button
          type="button"
          className="demo-icon-button"
          onClick={() => setAutoplay(!autoplay)}
          aria-label={autoplay ? 'Pause autoplay' : 'Start autoplay'}
          title={autoplay ? 'Pause autoplay' : 'Start autoplay'}
        >
          {autoplay ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
      <span className="demo-hint">
        DaisyUI-style animated slide deck with spring transitions and touch navigation.
      </span>
    </div>
  )
}

