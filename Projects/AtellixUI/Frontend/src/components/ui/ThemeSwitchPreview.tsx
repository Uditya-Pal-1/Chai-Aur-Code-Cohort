import type { Theme } from './types'

interface ThemeSwitchPreviewProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function ThemeSwitchPreview({ theme, onToggleTheme }: ThemeSwitchPreviewProps) {
  return (
    <div className="demo-stack">
      <div className="demo-theme-card">
        <span className="demo-eyebrow">CURRENT APPEARANCE</span>
        <strong>{theme === 'dark' ? 'Obsidian' : 'Soft ivory'}</strong>
        <span>Orange accent · accessible contrast</span>
      </div>
      <button className="demo-button demo-button-primary" onClick={onToggleTheme} type="button">
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </div>
  )
}
