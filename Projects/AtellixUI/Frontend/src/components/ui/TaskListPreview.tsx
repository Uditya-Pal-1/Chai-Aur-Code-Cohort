import { useState } from 'react'

export default function TaskListPreview() {
  const [tasks, setTasks] = useState(['Review design tokens', 'Test responsive layout'])
  const [newTask, setNewTask] = useState('')
  const [completed, setCompleted] = useState<string[]>([])

  return (
    <div className="demo-stack">
      <form className="demo-inline-form" onSubmit={(event) => {
        event.preventDefault()
        const task = newTask.trim()
        if (task) {
          setTasks((list) => [...list, task])
          setNewTask('')
        }
      }}>
        <input aria-label="New task" placeholder="Add a task…" value={newTask} onChange={(event) => setNewTask(event.target.value)} />
        <button className="demo-button demo-button-primary" type="submit">Add task</button>
      </form>
      <ul className="demo-list">
        {tasks.map((task) => (
          <li key={task}>
            <label className={completed.includes(task) ? 'is-complete' : ''}>
              <input
                type="checkbox"
                checked={completed.includes(task)}
                onChange={() => setCompleted((list) => list.includes(task) ? list.filter((item) => item !== task) : [...list, task])}
              />
              {task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
