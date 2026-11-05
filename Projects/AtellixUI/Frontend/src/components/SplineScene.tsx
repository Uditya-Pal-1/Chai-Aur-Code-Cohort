import { useEffect, useRef } from 'react'

const viewerScript = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js'
const defaultScene = 'https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode'

export default function SplineScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const mount = () => {
        if (!host.isConnected || host.childElementCount) return
        const viewer = document.createElement('spline-viewer')
        viewer.setAttribute('url', import.meta.env.VITE_SPLINE_SCENE_URL || defaultScene)
        viewer.setAttribute('loading', 'lazy')
        viewer.setAttribute('aria-hidden', 'true')
        viewer.style.width = '100%'
        viewer.style.height = '100%'
        viewer.style.position = 'absolute'
        viewer.style.inset = '0'
        viewer.style.background = 'transparent'
        host.append(viewer)
      }
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${viewerScript}"]`)
      if (customElements.get('spline-viewer')) mount()
      else if (existing) existing.addEventListener('load', mount, { once: true })
      else {
        const script = document.createElement('script')
        script.type = 'module'
        script.src = viewerScript
        script.onload = mount
        document.head.append(script)
      }
    }, { rootMargin: '160px' })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0" aria-label="Interactive 3D product scene">
      <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
    </div>
  )
}
