import { useState } from 'react'

const moods = ['Calm', 'Focused', 'Curious', 'Rested']

export default function MoodTrackerPreview() {
  const [mood, setMood] = useState('')

  return (
    <div className="demo-stack">
      <span className="demo-field-label">How are you feeling today?</span>
      <div className="demo-moods">
        {moods.map((value) => (
          <button key={value} type="button" className={mood === value ? 'is-selected' : ''} onClick={() => setMood(value)}>
            {value}
          </button>
        ))}
      </div>
      <p className="demo-result">{mood ? `Today is marked ${mood.toLowerCase()}.` : 'Choose a mood to add it to your day.'}</p>
    </div>
  )
}
