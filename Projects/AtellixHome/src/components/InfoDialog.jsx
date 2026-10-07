import useDialogFocus from '../hooks/useDialogFocus'

export default function InfoDialog({ html, info, onClose, Icon }) {
  const dialogRef = useDialogFocus(Boolean(info), onClose)
  if (!info) return null

  return html`<div
    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick=${onClose}
  >
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-title"
      ref=${dialogRef}
      tabIndex="-1"
      className="quick-view-panel w-full max-w-xl rounded-3xl bg-[#F7F4EF] text-[#342c23] p-7 md:p-10 shadow-2xl"
      onClick=${(event) => event.stopPropagation()}
    >
      <div className="flex justify-between items-start gap-6">
        <h2 id="info-title" className="serif text-4xl">${info.title}</h2>
        <button
          aria-label="Close information"
          className="shrink-0 p-2 rounded-full hover:bg-black/5"
          onClick=${onClose}
        >
          <${Icon} n="x" />
        </button>
      </div>
      <p className="mt-5 leading-8 opacity-85">${info.body}</p>
      <button className="btn f track mt-8" onClick=${onClose}>Close</button>
    </section>
  </div>`
}
