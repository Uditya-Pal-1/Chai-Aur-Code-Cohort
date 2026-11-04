import { useEffect, useRef } from 'react'
import portraitImage from '../assets/architect-portrait.png'
import type { Theme } from './ui/types'

interface DotPortraitProps {
  theme: Theme
}

export default function DotPortrait({ theme }: DotPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: -1, y: -1 })
  const drawRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const size = 640
    const step = theme === 'light' ? 3.5 : 4
    const gatherDuration = 1900
    canvas.width = size
    canvas.height = size

    const source = document.createElement('canvas')
    source.width = size
    source.height = size
    const sourceContext = source.getContext('2d', { willReadFrequently: true })
    if (!sourceContext) return

    const image = new Image()
    let animationFrame = 0
    let disposed = false
    let isInView = false
    let animationStart: number | null = null
    let renderPortrait: ((progress: number) => void) | null = null
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startGatherAnimation = () => {
      if (!renderPortrait || disposed) return
      if (reducedMotion) {
        renderPortrait(1)
        return
      }

      animationStart = null
      animationFrame = window.requestAnimationFrame(function animate(timestamp) {
        if (disposed || !renderPortrait) return
        animationStart ??= timestamp
        const progress = Math.min(1, (timestamp - animationStart) / gatherDuration)
        renderPortrait(progress)
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animate)
        } else {
          animationFrame = 0
          drawRef.current = () => renderPortrait?.(1)
        }
      })
    }

    image.onload = () => {
      if (disposed) return
      sourceContext.drawImage(image, 0, 0, image.naturalWidth, image.naturalWidth, 0, 0, size, size)
      const pixels = sourceContext.getImageData(0, 0, size, size).data
      const dots: { x: number; y: number; fromX: number; fromY: number; radius: number; tone: number }[] = []

      for (let y = step / 2; y < size; y += step) {
        for (let x = step / 2; x < size; x += step) {
          const pixel = (Math.floor(y) * size + Math.floor(x)) * 4
          const alpha = pixels[pixel + 3] / 255
          if (alpha < 0.14) continue
          const red = pixels[pixel]
          const green = pixels[pixel + 1]
          const blue = pixels[pixel + 2]
          const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
          const chroma = (Math.max(red, green, blue) - Math.min(red, green, blue)) / 255
          const tone = theme === 'light'
            ? luminance ** 1.35 * (0.2 + 0.8 * Math.min(1, chroma / 0.32))
            : luminance
          const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
          const random = seed - Math.floor(seed)
          const angle = Math.atan2(y - size / 2, x - size / 2) + (random - 0.5) * 0.8
          const distance = 36 + random * 150
          dots.push({
            x,
            y,
            fromX: x + Math.cos(angle) * distance,
            fromY: y + Math.sin(angle) * distance,
            radius: theme === 'light' ? 1.4 + tone * 0.4 : 0.64 + luminance * 0.68,
            tone,
          })
        }
      }

      const colorBands = Array.from({ length: 32 }, (_, index) => {
        const shade = Math.floor(index / 8)
        if (theme === 'dark') {
          const opacity = 0.28 + (index % 8) * 0.095
          const colors = ['140, 55, 24', '210, 83, 30', '255, 138, 61', '255, 239, 220']
          return `rgba(${colors[shade]}, ${opacity})`
        }
        const opacity = 0.95 + (index % 8) * 0.007
        const colors = ['18, 15, 14', '58, 32, 22', '116, 42, 19', '173, 56, 17']
        return `rgba(${colors[shade]}, ${opacity})`
      })

      const render = (progress: number) => {
        context.clearRect(0, 0, size, size)
        const pointer = pointerRef.current
        const easedProgress = 1 - (1 - progress) ** 3
        const buckets = Array.from({ length: colorBands.length }, () => new Path2D())

        dots.forEach(({ x, y, fromX, fromY, radius, tone }) => {
          const drawX = fromX + (x - fromX) * easedProgress
          const drawY = fromY + (y - fromY) * easedProgress
          const distance = Math.hypot(drawX - pointer.x, drawY - pointer.y)
          const ripple = pointer.x < 0 ? 0 : Math.max(0, 1 - distance / 118)
          const dotRadius = radius + ripple * 0.32
          const shade = tone < 0.22 ? 0 : tone < 0.43 ? 1 : tone < 0.66 ? 2 : 3
          const opacityBand = Math.min(7, Math.floor(Math.min(0.99, 0.32 + tone * 0.62 + ripple * 0.18) * 8))
          const bucketIndex = shade * 8 + opacityBand
          buckets[bucketIndex].moveTo(drawX + dotRadius, drawY)
          buckets[bucketIndex].arc(drawX, drawY, dotRadius, 0, Math.PI * 2)
        })

        buckets.forEach((path, index) => {
          context.fillStyle = colorBands[index]
          context.fill(path)
        })
      }

      renderPortrait = render
      drawRef.current = () => render(1)
      render(0)
      if (isInView) startGatherAnimation()
    }
    image.onerror = () => console.error('Unable to load the architect portrait for the dot artwork.')
    image.src = portraitImage

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || isInView) return
      isInView = true
      if (!image.complete || !image.naturalWidth) return
      startGatherAnimation()
    }, { threshold: 0.2 })
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      drawRef.current = null
      image.onload = null
      image.onerror = null
      source.width = 0
      source.height = 0
    }
  }, [theme])

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const scale = 640 / bounds.width
    pointerRef.current = {
      x: (event.clientX - bounds.left) * scale,
      y: (event.clientY - bounds.top) * scale,
    }
    drawRef.current?.()
  }

  const clearPointer = () => {
    pointerRef.current = { x: -1, y: -1 }
    drawRef.current?.()
  }

  return (
    <div
      className="creator-portrait"
      role="img"
      aria-label={theme === 'light'
        ? 'Portrait of AtellixUI architect and lead engineer Uditya Pal'
        : 'Animated orange dot portrait of AtellixUI architect and lead engineer Uditya Pal'}
      onPointerMove={updatePointer}
      onPointerLeave={clearPointer}
    >
      <div className="creator-portrait-glow" aria-hidden="true" />
      {theme === 'light' ? (
        <img
          src={portraitImage}
          className="creator-portrait-photo"
          alt=""
          width={768}
          height={768}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <canvas ref={canvasRef} className="creator-portrait-canvas" aria-hidden="true" />
      )}
      <span className="creator-portrait-caption">UDITYA PAL <span>·</span> ARCHITECT</span>
    </div>
  )
}
