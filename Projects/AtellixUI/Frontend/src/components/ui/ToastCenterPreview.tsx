import { useEffect, useRef, useState } from 'react'

interface ToastMessage {
  id: number
  message: string
}

export default function ToastCenterPreview() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextId = useRef(0)
  const timers = useRef(new Set<number>())

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const notify = () => {
    const id = ++nextId.current
    setToasts((current) => [...current, { id, message: 'Your changes have been saved.' }])
    const timer = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
      timers.current.delete(timer)
    }, 3500)
    timers.current.add(timer)
  }

  const dismiss = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  return (
    <div className="demo-stack">
      <button className="demo-button demo-button-primary" type="button" onClick={notify}>Show success toast</button>
      <div className="demo-toast-stack" aria-live="polite" aria-relevant="additions removals">
        {toasts.map((toast) => <div className="demo-toast" role="status" key={toast.id}><span>{toast.message}</span><button type="button" aria-label="Dismiss notification" onClick={() => dismiss(toast.id)}>×</button></div>)}
      </div>
      <span className="demo-hint">Notifications dismiss automatically or with the close button.</span>
    </div>
  )
}
