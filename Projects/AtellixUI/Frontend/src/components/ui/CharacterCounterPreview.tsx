import { useState } from 'react'

export default function CharacterCounterPreview() {
  const [text, setText] = useState('')

  return (
    <div className="demo-stack">
      <label className="demo-field-label" htmlFor="demo-counter">Your message <span>{text.length}/180</span></label>
      <textarea id="demo-counter" maxLength={180} placeholder="Write a concise message…" value={text} onChange={(event) => setText(event.target.value)} />
      <span className="demo-hint">{180 - text.length} characters remaining</span>
    </div>
  )
}
