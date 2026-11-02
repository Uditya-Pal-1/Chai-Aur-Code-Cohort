import { useEffect, useState } from 'react'

export default function DigitalClockPreview() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="demo-clock">
      <span className="demo-eyebrow">LOCAL TIME</span>
      <strong>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</strong>
      <span>{time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span>
    </div>
  )
}
