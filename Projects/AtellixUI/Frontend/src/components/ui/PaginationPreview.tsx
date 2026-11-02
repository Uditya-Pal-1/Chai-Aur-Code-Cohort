import { useState } from 'react'

const entries = ['Foundation tokens', 'Accessible buttons', 'Responsive layouts', 'Motion guidelines', 'Form patterns', 'Component APIs', 'Color contrast', 'Keyboard support', 'Release notes']
const pageSize = 3

export default function PaginationPreview() {
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(entries.length / pageSize)
  const visible = entries.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div className="demo-stack">
      <ul className="demo-list">{visible.map((entry) => <li key={entry}>{entry}</li>)}</ul>
      <nav className="demo-pagination" aria-label="Pagination">
        <button className="demo-button" type="button" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Previous</button>
        {Array.from({ length: pageCount }, (_, index) => <button className={`demo-button ${page === index ? 'demo-button-primary' : ''}`} key={index} type="button" aria-current={page === index ? 'page' : undefined} aria-label={`Page ${index + 1}`} onClick={() => setPage(index)}>{index + 1}</button>)}
        <button className="demo-button" type="button" disabled={page === pageCount - 1} onClick={() => setPage((current) => current + 1)}>Next</button>
      </nav>
      <span className="demo-hint" aria-live="polite">Page {page + 1} of {pageCount} · showing {visible.length} items.</span>
    </div>
  )
}
