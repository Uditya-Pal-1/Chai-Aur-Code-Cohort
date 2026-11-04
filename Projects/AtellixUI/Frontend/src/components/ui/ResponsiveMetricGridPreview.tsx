import { useState } from 'react'
import { Activity, Cpu, Layers, Shield, Sparkles, Zap } from 'lucide-react'

export default function ResponsiveMetricGridPreview() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null)

  const items = [
    {
      id: 'tokens',
      title: 'Token-First Architecture',
      subtitle: 'Dynamic CSS variables update surfaces instantaneously without app re-render.',
      metric: '48 Tokens',
      tag: 'CORE',
      icon: Layers,
      size: 'is-tall',
    },
    {
      id: 'performance',
      title: 'Sub-8ms Latency',
      subtitle: 'Zero runtime style injection with native Tailwind v4 integration.',
      metric: '0.4 kB gzip',
      tag: 'SPEED',
      icon: Zap,
      size: 'is-standard',
    },
    {
      id: 'a11y',
      title: 'WCAG 2.1 AA Compliant',
      subtitle: 'Full keyboard navigation traps, ARIA roles, and high-contrast color algorithms.',
      metric: '100% Score',
      tag: 'ACCESSIBILITY',
      icon: Shield,
      size: 'is-standard',
    },
    {
      id: 'ai',
      title: 'MCP-Native AI Generation',
      subtitle: 'Expose component AST manipulation directly to AI agents in IDEs.',
      metric: '5 Tools',
      tag: 'ECOSYSTEM',
      icon: Cpu,
      size: 'is-wide',
    },
    {
      id: 'motion',
      title: 'Spring Physics',
      subtitle: 'Controlled amplitude animations respecting reduced-motion preferences.',
      metric: '60 FPS',
      tag: 'INTERACTION',
      icon: Activity,
      size: 'is-standard',
    },
  ]

  return (
    <div className="demo-stack demo-metricgrid-container">
      <div className="demo-metricgrid-stage">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeMetric === item.id
          return (
            <article
              key={item.id}
              className={`demo-metricgrid-card ${item.size} ${isActive ? 'is-highlighted' : ''}`}
              onClick={() => setActiveMetric(isActive ? null : item.id)}
            >
              <div className="demo-card-glimmer" aria-hidden="true" />
              <div className="demo-metriccard-header">
                <span className="demo-badge demo-badge-subtle">{item.tag}</span>
                <span className="demo-metriccard-icon">
                  <Icon size={18} color="#ff8a3d" />
                </span>
              </div>
              <div className="demo-metriccard-content">
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
              <div className="demo-metriccard-footer">
                <strong className="demo-metric-stat">{item.metric}</strong>
                <span className="demo-metriccard-action">
                  <Sparkles size={13} />
                </span>
              </div>
            </article>
          )
        })}
      </div>
      <span className="demo-hint">
        Responsive asymmetric grid inspired by DaisyUI card layouts with interactive highlight states.
      </span>
    </div>
  )
}

