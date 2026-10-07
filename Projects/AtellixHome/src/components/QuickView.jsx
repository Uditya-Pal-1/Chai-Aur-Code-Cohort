import React from 'react'
import useDialogFocus from '../hooks/useDialogFocus'

export default function QuickViewComponent({ html, p, onClose, onAdd, Ic, ROOM_IMAGES, fmt, PAL }) {
  const [ci, setCi] = React.useState(0)
  const dialogRef = useDialogFocus(true, onClose)
  return html`<div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    onClick=${onClose}
  >
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      ref=${dialogRef}
      tabIndex="-1"
      className="quick-view-panel bg-[#F7F4EF] text-[#121212] max-w-3xl w-full grid md:grid-cols-2 rounded-3xl overflow-hidden"
      style=${{ animation: 'fi .5s both' }}
      onClick=${(e) => e.stopPropagation()}
    >
      <div className="quick-view-image p-4 flex items-center bg-[#E5E0D8]">
        <img
          src=${ROOM_IMAGES[p.k][ci % ROOM_IMAGES[p.k].length]}
          alt=${p.n + ' product view'}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="p-8 relative">
        <button
          aria-label="Close product details"
          className="absolute top-5 right-5"
          onClick=${onClose}
        >
          <${Ic} n="x" />
        </button>
        <div className="track gold">${p.cat}</div>
        <h3 id="quick-view-title" className="serif text-4xl mt-2">${p.n}</h3>
        <div className="text-2xl mt-3">${fmt(p.p)}</div>
        <p className="mt-4 text-sm leading-7 opacity-80">
          Material: ${p.m}. Choose a finish below, or contact our showroom for help with your
          selection.
        </p>
        <div className="track mt-6 mb-3 opacity-50">Finish — ${PAL[p.cols[ci]][0]}</div>
        <div className="flex gap-3">
          ${p.cols.map((x, i) => html`<button key=${x} type="button" aria-label=${'Choose ' + PAL[x][0] + ' finish'} aria-pressed=${ci === i} onClick=${() => setCi(i)} className="w-9 h-9 rounded-full transition" style=${{ background: PAL[x][1], outline: ci === i ? '2px solid #D4AF37' : 'none', outlineOffset: 3 }} />`)}
        </div>
        <a
          href=${'https://wa.me/918859530028?text=' + encodeURIComponent('Hello, I would like to know more about ' + p.n + '.')}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm underline underline-offset-4 mt-6 hover:text-[#806239]"
          >Ask about this piece on WhatsApp</a
        >
        <button
          className="btn f track w-full mt-5"
          onClick=${() => {
            onAdd(p)
            onClose()
          }}
        >
          Add to Bag
        </button>
      </div>
    </section>
  </div>`
}
