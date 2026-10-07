export default function RevealComponent({ html, FM, children, className, delay = 0, x = 0 }) {
  const C = FM.motion ? FM.motion.div : 'div'
  const p = FM.motion
    ? {
        initial: { opacity: 0, y: 40, x },
        whileInView: { opacity: 1, y: 0, x: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {}
  return html`<${C} className=${className} ...${p}>${children}<//>`
}
