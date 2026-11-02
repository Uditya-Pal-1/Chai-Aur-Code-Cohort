import { useState } from 'react'

export default function KanbanBoardPreview() {
  const [column, setColumn] = useState(0)

  return (
    <div className="demo-kanban">
      {['To do', 'In progress', 'Done'].map((name, index) => (
        <div className={`demo-kanban-column ${column === index ? 'is-active' : ''}`} key={name}>
          <span>{name}</span>
          {column === index && <div className="demo-kanban-task">Polish component details</div>}
        </div>
      ))}
      <button className="demo-button demo-button-primary" type="button" onClick={() => setColumn((value) => (value + 1) % 3)}>
        Move task →
      </button>
    </div>
  )
}
