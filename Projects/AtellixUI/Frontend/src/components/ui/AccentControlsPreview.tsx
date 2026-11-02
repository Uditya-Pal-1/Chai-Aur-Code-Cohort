import { useState } from 'react'

const accentOptions = ['#FF9B55', '#FF8A3D', '#FF741F', '#F5660D', '#D94E00']

export default function AccentControlsPreview() {
  const [color, setColor] = useState('#ff8a3d')
  const [wallpaper, setWallpaper] = useState('surface-dark')

  return (
    <div className="demo-stack">
      <div className={`demo-wallpaper ${wallpaper}`} style={{ '--demo-accent': color } as React.CSSProperties}>
        <span>Live theme preview</span>
      </div>
      <div className="demo-controls">
        <div className="demo-accent-control">
          <span>Orange accent</span>
          <div className="demo-accent-options">
            {accentOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-label={`Set orange accent ${option}`}
                aria-pressed={color === option}
                style={{ backgroundColor: option }}
                onClick={() => setColor(option)}
              />
            ))}
          </div>
        </div>
        <label>
          Surface
          <select value={wallpaper} onChange={(event) => setWallpaper(event.target.value)}>
            <option value="surface-dark">Obsidian</option>
            <option value="surface-paper">Warm paper</option>
            <option value="surface-grid">Fine grid</option>
          </select>
        </label>
      </div>
    </div>
  )
}
