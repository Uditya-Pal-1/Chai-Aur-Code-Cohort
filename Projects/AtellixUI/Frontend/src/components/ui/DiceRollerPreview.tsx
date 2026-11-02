import { useState } from 'react'

export default function DiceRollerPreview() {
  const [die, setDie] = useState(4)

  return (
    <div className="demo-centered">
      <div className="demo-die" key={die}>{die}</div>
      <button className="demo-button demo-button-primary" type="button" onClick={() => setDie(Math.floor(Math.random() * 6) + 1)}>
        Roll die
      </button>
    </div>
  )
}
