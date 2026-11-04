import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftRight, CheckCircle, GripVertical, Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  tag: string
  stage: 'Backlog' | 'In Progress' | 'Shipped'
}

const initialTasks: Task[] = [
  { id: 't1', title: 'Token extraction algorithm', tag: 'Core', stage: 'Backlog' },
  { id: 't2', title: 'Interactive Slider with steps', tag: 'Input', stage: 'In Progress' },
  { id: 't3', title: 'Three.js 3D Hero scene', tag: 'Visual', stage: 'Shipped' },
  { id: 't4', title: 'Accessible Tab keyboard loop', tag: 'A11y', stage: 'In Progress' },
]

export default function DragDropBoardPreview() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const columns: Task['stage'][] = ['Backlog', 'In Progress', 'Shipped']

  const moveTask = (id: string, direction: 'forward' | 'backward') => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        const currentIndex = columns.indexOf(task.stage)
        const nextIndex =
          direction === 'forward'
            ? Math.min(columns.length - 1, currentIndex + 1)
            : Math.max(0, currentIndex - 1)
        return { ...task, stage: columns[nextIndex] }
      })
    )
  }

  const addTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: `Component optimization #${tasks.length + 1}`,
      tag: 'New',
      stage: 'Backlog',
    }
    setTasks((prev) => [...prev, newTask])
  }

  return (
    <div className="demo-stack demo-dragdrop-board">
      <div className="demo-board-top">
        <span className="demo-eyebrow">DRAG & DROP WORKFLOW</span>
        <button type="button" className="demo-button demo-button-subtle" onClick={addTask}>
          <Plus size={14} /> Add Task
        </button>
      </div>

      <div className="demo-board-columns">
        {columns.map((column) => {
          const colTasks = tasks.filter((t) => t.stage === column)
          return (
            <div className="demo-board-column" key={column}>
              <div className="demo-column-header">
                <span className="demo-column-title">{column}</span>
                <span className="demo-column-count">{colTasks.length}</span>
              </div>

              <div className="demo-task-list">
                <AnimatePresence mode="popLayout">
                  {colTasks.map((task) => (
                    <motion.article
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="demo-task-card"
                      key={task.id}
                    >
                      <div className="demo-task-drag-handle">
                        <GripVertical size={14} />
                      </div>
                      <div className="demo-task-content">
                        <span className="demo-task-tag">{task.tag}</span>
                        <p>{task.title}</p>
                        <div className="demo-task-buttons">
                          {column !== 'Backlog' && (
                            <button
                              type="button"
                              className="demo-task-shift-btn"
                              title="Move back"
                              onClick={() => moveTask(task.id, 'backward')}
                            >
                              ←
                            </button>
                          )}
                          {column !== 'Shipped' && (
                            <button
                              type="button"
                              className="demo-task-shift-btn is-primary"
                              title="Advance task"
                              onClick={() => moveTask(task.id, 'forward')}
                            >
                              Advance →
                            </button>
                          )}
                          {column === 'Shipped' && (
                            <span className="demo-task-shipped-icon" title="Completed">
                              <CheckCircle size={14} color="#4ade80" />
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
                {colTasks.length === 0 && (
                  <div className="demo-column-empty">No tasks in {column.toLowerCase()}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <span className="demo-hint">
        <ArrowLeftRight size={13} /> Interactive workflow columns with Framer Motion layout animations.
      </span>
    </div>
  )
}

