import { useState } from 'react'

const metrics = [
  { label: 'Active projects', value: '12', delta: '+2 this week' },
  { label: 'Design tokens', value: '84', delta: '+8 this week' },
  { label: 'Components', value: '56', delta: 'All systems good' },
]

export default function DashboardLayoutPreview() {
  const [range, setRange] = useState('7 days')

  return (
    <div className="demo-dashboard-layout">
      <aside><span className="demo-site-wordmark">ATX<span>.</span></span><a className="is-active" href="#overview" onClick={(event) => event.preventDefault()}>Overview</a><a href="#projects" onClick={(event) => event.preventDefault()}>Projects</a><a href="#settings" onClick={(event) => event.preventDefault()}>Settings</a></aside>
      <section><header><div><span className="demo-eyebrow">WORKSPACE</span><strong>Good morning, Alex</strong></div><label>Range <select value={range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select></label></header><div className="demo-dashboard-metrics">{metrics.map((metric) => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.delta}</small></article>)}</div><div className="demo-dashboard-chart"><span>Workspace activity · {range}</span><div aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div></div></section>
    </div>
  )
}
