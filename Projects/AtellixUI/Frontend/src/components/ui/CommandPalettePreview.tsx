import { useEffect, useMemo, useState } from 'react'

const commands = [
  { name: 'Open component gallery', keywords: 'components gallery preview' },
  { name: 'Switch color theme', keywords: 'theme dark light appearance' },
  { name: 'Review design tokens', keywords: 'system colors spacing tokens' },
  { name: 'View founder profile', keywords: 'about creator profile' },
]

export default function CommandPalettePreview() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const results = useMemo(() => commands.filter((command) => `${command.name} ${command.keywords}`.toLowerCase().includes(query.toLowerCase())), [query])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
        setQuery('')
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <div className="demo-stack">
      <button className="demo-button demo-button-primary" type="button" onClick={() => { setOpen(true); setQuery('') }}>Open command palette <kbd>Ctrl K</kbd></button>
      {selected && <span className="demo-hint" role="status">{selected}</span>}
      {open && (
        <div className="demo-command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <section className="demo-command" role="dialog" aria-modal="true" aria-label="Command palette">
            <label className="demo-field">
              <span className="demo-visually-hidden">Search commands</span>
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a command…" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); if (event.key === 'Enter' && results[0]) { setSelected(results[0].name); setOpen(false) } }} />
            </label>
            <ul>{results.map((command) => <li key={command.name}><button type="button" onClick={() => { setSelected(command.name); setOpen(false) }}>{command.name}<span>↵</span></button></li>)}</ul>
            {!results.length && <span className="demo-hint">No matching commands.</span>}
          </section>
        </div>
      )}
      <span className="demo-hint">Keyboard shortcut: Ctrl K / ⌘ K · Esc to close.</span>
    </div>
  )
}
