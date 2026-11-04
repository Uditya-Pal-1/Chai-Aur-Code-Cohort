import { useState, useMemo } from 'react'
import { ArrowUpDown, Check, ChevronLeft, ChevronRight, Search, ShieldCheck } from 'lucide-react'

interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Pending' | 'Offline'
  components: number
}

const mockRecords: UserRecord[] = [
  { id: '1', name: 'Uditya Pal', email: 'uditya@atellixui.dev', role: 'Architect', status: 'Active', components: 55 },
  { id: '2', name: 'Aman Sharma', email: 'aman@cohort.dev', role: 'Frontend Lead', status: 'Active', components: 42 },
  { id: '3', name: 'Priya Verma', email: 'priya@studio.io', role: 'Design Eng.', status: 'Pending', components: 18 },
  { id: '4', name: 'Marcus Chen', email: 'marcus@tokendesign.co', role: 'Systems Eng.', status: 'Active', components: 31 },
  { id: '5', name: 'Elena Rostova', email: 'elena@canvas.org', role: 'Motion Spec.', status: 'Offline', components: 12 },
]

export default function AdvancedTablePreview() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['1']))
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<keyof UserRecord>('components')
  const [sortAsc, setSortAsc] = useState(false)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return mockRecords
      .filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.email.toLowerCase().includes(search.toLowerCase()) ||
          r.role.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[sortField]
        const valB = b[sortField]
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA))
      })
  }, [search, sortField, sortAsc])

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((r) => r.id)))
    }
  }

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleSort = (field: keyof UserRecord) => {
    if (sortField === field) setSortAsc(!sortAsc)
    else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  return (
    <div className="demo-stack demo-table-enhanced">
      <div className="demo-table-toolbar">
        <div className="demo-table-search-box">
          <Search size={15} />
          <input
            type="search"
            placeholder="Search contributors, roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="demo-table-bulk-actions">
          {selectedIds.size > 0 && (
            <span className="demo-badge demo-badge-primary">
              <Check size={12} /> {selectedIds.size} selected
            </span>
          )}
        </div>
      </div>

      <div className="demo-table-responsive-container">
        <table className="demo-data-table">
          <thead>
            <tr>
              <th className="demo-th-checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.size === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
              <th>
                <button type="button" className="demo-th-sort" onClick={() => handleSort('name')}>
                  Contributor <ArrowUpDown size={12} />
                </button>
              </th>
              <th>Role</th>
              <th>Status</th>
              <th>
                <button type="button" className="demo-th-sort" onClick={() => handleSort('components')}>
                  Components <ArrowUpDown size={12} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const isSelected = selectedIds.has(row.id)
              return (
                <tr className={isSelected ? 'is-selected' : ''} key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(row.id)}
                      aria-label={`Select ${row.name}`}
                    />
                  </td>
                  <td>
                    <div className="demo-table-user-cell">
                      <div className="demo-table-user-avatar">
                        {row.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong>{row.name}</strong>
                        <small>{row.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="demo-role-chip">{row.role}</span>
                  </td>
                  <td>
                    <span className={`demo-status-pill status-${row.status.toLowerCase()}`}>
                      <i /> {row.status}
                    </span>
                  </td>
                  <td>
                    <span className="demo-metric-cell">
                      <ShieldCheck size={14} color="#ff8a3d" /> {row.components}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="demo-table-pagination-bar">
        <span>
          Showing <strong>{filtered.length}</strong> of <strong>{mockRecords.length}</strong> entries
        </span>
        <div className="demo-pagination-buttons">
          <button
            type="button"
            className="demo-icon-button"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="demo-page-number">Page {page}</span>
          <button type="button" className="demo-icon-button" disabled={page === 1}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

