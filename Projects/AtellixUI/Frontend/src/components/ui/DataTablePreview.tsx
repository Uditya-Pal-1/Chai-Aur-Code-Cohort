import { useMemo, useState } from 'react'

const rows = [
  { name: 'Button', type: 'Primitive', status: 'Ready', updated: 'Today' },
  { name: 'Data grid', type: 'Enterprise', status: 'Review', updated: 'Yesterday' },
  { name: 'Dialog', type: 'Overlay', status: 'Ready', updated: 'May 18' },
  { name: 'Form field', type: 'Input', status: 'Draft', updated: 'May 12' },
]

export default function DataTablePreview() {
  const [query, setQuery] = useState('')
  const [sortAscending, setSortAscending] = useState(true)
  const filtered = useMemo(() => rows
    .filter((row) => `${row.name} ${row.type} ${row.status}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)), [query, sortAscending])

  return (
    <div className="demo-stack demo-table-wrap">
      <label className="demo-field"><span className="demo-field-label">Filter components</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rows…" /></label>
      <div className="demo-table-scroll">
        <table className="demo-table">
          <thead><tr><th><button type="button" onClick={() => setSortAscending((current) => !current)} aria-label={`Sort by name ${sortAscending ? 'descending' : 'ascending'}`}>Component ↕</button></th><th>Type</th><th>Status</th></tr></thead>
          <tbody>{filtered.map((row) => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.type}</td><td><span className={`demo-status status-${row.status.toLowerCase()}`}>{row.status}</span></td></tr>)}</tbody>
        </table>
      </div>
      <span className="demo-hint" aria-live="polite">{filtered.length} of {rows.length} components · sorted by name</span>
    </div>
  )
}
