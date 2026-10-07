import React from 'react'

export default function StatComponent({ html, to, suf, label }) {
  const [v, setV] = React.useState(0),
    ref = React.useRef()
  React.useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        o.disconnect()
        const t0 = performance.now()
        const f = (t) => {
          const k = Math.min((t - t0) / 1800, 1)
          setV(Math.round(to * (1 - Math.pow(1 - k, 3))))
          if (k < 1) requestAnimationFrame(f)
        }
        requestAnimationFrame(f)
      }
    })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [to])
  return html`<div ref=${ref} className="border-t border-[#D4AF37]/40 pt-5">
    <div className="serif text-5xl md:text-6xl gold">${v.toLocaleString('en-US')}${suf}</div>
    <div className="track mt-3 opacity-60">${label}</div>
  </div>`
}
