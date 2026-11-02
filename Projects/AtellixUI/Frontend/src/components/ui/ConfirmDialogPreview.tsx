import { useEffect, useRef, useState } from 'react'

export default function ConfirmDialogPreview() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="demo-stack">
      <button className="demo-button demo-button-primary" type="button" onClick={() => { setStatus(''); setOpen(true) }}>Open confirmation</button>
      <span className="demo-hint" role="status">{status}</span>
      {open && (
        <div className="demo-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-description">
            <span className="demo-eyebrow">CONFIRM ACTION</span>
            <h4 id="confirm-title">Archive this project?</h4>
            <p id="confirm-description">You can restore this project later from your archived work.</p>
            <div className="demo-actions">
              <button ref={cancelRef} className="demo-button" type="button" onClick={() => setOpen(false)}>Cancel</button>
              <button className="demo-button demo-button-primary" type="button" onClick={() => { setOpen(false); setStatus('Project archived in this preview.') }}>Archive project</button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
