export default function StatusToast({ html, message }) {
  return html`<div
    role="status"
    aria-live="polite"
    className="fixed bottom-8 left-1/2 z-[120] bg-[#D4AF37] text-[#121212] px-6 py-3 rounded-full track transition-all duration-500"
    style=${{
      opacity: message ? 1 : 0,
      transform: `translate(-50%, ${message ? 0 : 20}px)`,
      pointerEvents: 'none',
    }}
  >
    ${message}
  </div>`
}
