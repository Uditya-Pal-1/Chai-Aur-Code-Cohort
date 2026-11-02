import { useMemo, useState } from 'react'

const options = ['Button', 'Color picker', 'Data table', 'Dialog', 'Dropdown', 'Form field', 'Tooltip']

export default function SearchSelectPreview() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const filtered = useMemo(() => options.filter((option) => option.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <div className="demo-stack">
      <label className="demo-field">
        <span className="demo-field-label">Find a component</span>
        <input role="combobox" aria-expanded={open} aria-controls="search-select-options" value={query} placeholder={selected || 'Search components…'} onFocus={() => setOpen(true)} onChange={(event) => { setQuery(event.target.value); setOpen(true) }} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); if (event.key === 'Enter' && filtered[0]) { setSelected(filtered[0]); setQuery(''); setOpen(false) } }} />
      </label>
      {open && (
        <ul className="demo-select-options" id="search-select-options" role="listbox">
          {filtered.length ? filtered.map((option) => <li key={option}><button type="button" role="option" aria-selected={selected === option} onClick={() => { setSelected(option); setQuery(''); setOpen(false) }}>{option}</button></li>) : <li className="demo-hint">No matches found.</li>}
        </ul>
      )}
      <span className="demo-hint" aria-live="polite">{selected ? `Selected: ${selected}` : 'Type to filter, then select an option.'}</span>
    </div>
  )
}
