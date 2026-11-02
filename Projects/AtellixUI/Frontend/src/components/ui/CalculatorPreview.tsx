import { useState } from 'react'

export default function CalculatorPreview() {
  const [values, setValues] = useState([24, 6])

  return (
    <div className="demo-stack">
      <div className="demo-controls">
        {values.map((value, index) => (
          <label key={index}>
            Value {index + 1}
            <input
              type="number"
              value={value}
              onChange={(event) => setValues((current) => current.map((item, position) => position === index ? Number(event.target.value) : item))}
            />
          </label>
        ))}
      </div>
      <div className="demo-calculation">{values[0]} + {values[1]} <strong>= {values[0] + values[1]}</strong></div>
    </div>
  )
}
