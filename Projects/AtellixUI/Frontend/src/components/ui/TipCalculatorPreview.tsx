import { useState } from 'react'

export default function TipCalculatorPreview() {
  const [bill, setBill] = useState(48)
  const [tip, setTip] = useState(18)
  const [people, setPeople] = useState(2)
  const total = bill * (1 + tip / 100)

  return (
    <div className="demo-stack">
      <div className="demo-controls">
        <label>Bill total<input type="number" min="0" value={bill} onChange={(event) => setBill(Number(event.target.value))} /></label>
        <label>Tip %<input type="number" min="0" value={tip} onChange={(event) => setTip(Number(event.target.value))} /></label>
        <label>People<input type="number" min="1" value={people} onChange={(event) => setPeople(Math.max(1, Number(event.target.value)))} /></label>
      </div>
      <div className="demo-calculation">Per person <strong>${(total / people).toFixed(2)}</strong></div>
    </div>
  )
}
