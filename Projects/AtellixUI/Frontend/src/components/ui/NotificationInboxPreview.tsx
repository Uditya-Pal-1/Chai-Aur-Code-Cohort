import { useMemo, useState } from 'react'

const initialNotifications = [
  { id: 1, title: 'Review requested', detail: 'A teammate shared a new button spec.', time: '5 min ago', read: false },
  { id: 2, title: 'Build completed', detail: 'The component preview is ready to inspect.', time: '1 hour ago', read: false },
  { id: 3, title: 'Token update', detail: 'Orange accent tokens were updated.', time: 'Yesterday', read: true },
]

export default function NotificationInboxPreview() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unread = useMemo(() => notifications.filter((notification) => !notification.read).length, [notifications])

  return (
    <div className="demo-stack">
      <div className="demo-inbox-heading"><strong>Inbox</strong><span>{unread} unread</span><button className="demo-button" type="button" disabled={!unread} onClick={() => setNotifications((current) => current.map((item) => ({ ...item, read: true })))}>Mark all read</button></div>
      <ul className="demo-notification-list">
        {notifications.map((item) => <li className={item.read ? '' : 'is-unread'} key={item.id}><span className="demo-notification-dot" aria-hidden="true" /><div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.time}</small></div><button className="demo-button" type="button" aria-label={`Mark ${item.title} ${item.read ? 'unread' : 'read'}`} onClick={() => setNotifications((current) => current.map((entry) => entry.id === item.id ? { ...entry, read: !entry.read } : entry))}>{item.read ? 'Unread' : 'Read'}</button></li>)}
      </ul>
    </div>
  )
}
