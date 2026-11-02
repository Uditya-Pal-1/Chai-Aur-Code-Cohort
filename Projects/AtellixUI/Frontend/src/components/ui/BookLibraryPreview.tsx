import { useMemo, useState } from 'react'

const bookTitles = ['Designing Interfaces', 'Refactoring UI', 'The Design of Everyday Things']

export default function BookLibraryPreview() {
  const [query, setQuery] = useState('')
  const [sortAscending, setSortAscending] = useState(true)
  const filteredBooks = useMemo(
    () => bookTitles
      .filter((title) => title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => sortAscending ? a.localeCompare(b) : b.localeCompare(a)),
    [query, sortAscending],
  )

  return (
    <div className="demo-stack">
      <div className="demo-book-controls">
        <input aria-label="Search books" placeholder="Search the library…" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button className="demo-button" type="button" onClick={() => setSortAscending((value) => !value)}>Sort {sortAscending ? 'A–Z' : 'Z–A'}</button>
      </div>
      <ul className="demo-list">{filteredBooks.map((title) => <li key={title}>{title}</li>)}</ul>
      {!filteredBooks.length && <p className="demo-hint">No matching titles.</p>}
    </div>
  )
}
