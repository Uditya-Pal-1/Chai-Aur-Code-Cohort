import { useEffect, useState } from 'react'

export default function CountdownTimerPreview() {
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const interval = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false)
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [running])

  return (
    <div className="demo-clock">
      <span className="demo-eyebrow">FOCUS TIMER</span>
      <strong>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</strong>
      <div className="demo-actions">
        <button
          className="demo-button demo-button-primary"
          type="button"
          onClick={() => seconds ? setRunning((value) => !value) : (setSeconds(60), setRunning(true))}
        >
          {seconds ? running ? 'Pause' : 'Start' : 'Restart'}
        </button>
        <button className="demo-button" type="button" onClick={() => { setRunning(false); setSeconds(60) }}>Reset</button>
      </div>
    </div>
  )
}
