import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, DollarSign, Eye, ShoppingCart, Users } from 'lucide-react'

interface StatItem {
  id: string
  title: string
  value: string
  change: string
  isPositive: boolean
  period: string
  icon: typeof DollarSign
}

const initialStats: StatItem[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$48,290',
    change: '+14.2%',
    isPositive: true,
    period: 'vs last month',
    icon: DollarSign,
  },
  {
    id: 'users',
    title: 'Active Developers',
    value: '2,845',
    change: '+28.4%',
    isPositive: true,
    period: 'vs last month',
    icon: Users,
  },
  {
    id: 'conversions',
    title: 'Component Copies',
    value: '19,420',
    change: '+8.1%',
    isPositive: true,
    period: 'vs last week',
    icon: ShoppingCart,
  },
  {
    id: 'bounce',
    title: 'Bounce Rate',
    value: '24.8%',
    change: '-3.6%',
    isPositive: false,
    period: 'vs last month',
    icon: Eye,
  },
]

export default function StatsPreview() {
  const [stats, setStats] = useState(initialStats)
  const [range, setRange] = useState<'30d' | '7d'>('30d')

  const toggleRange = (selected: '30d' | '7d') => {
    setRange(selected)
    setStats((prev) =>
      prev.map((item) => ({
        ...item,
        value:
          selected === '7d'
            ? `$${(Math.random() * 12 + 8).toFixed(1)}k`
            : item.id === 'revenue'
              ? '$48,290'
              : item.value,
      }))
    )
  }

  return (
    <div className="demo-stack demo-stats-container">
      <div className="demo-stats-header">
        <span className="demo-eyebrow">METRICS & ANALYTICS</span>
        <div className="demo-stats-tabs" role="tablist">
          <button
            type="button"
            className={range === '30d' ? 'is-active' : ''}
            onClick={() => toggleRange('30d')}
          >
            30 Days
          </button>
          <button
            type="button"
            className={range === '7d' ? 'is-active' : ''}
            onClick={() => toggleRange('7d')}
          >
            7 Days
          </button>
        </div>
      </div>

      <div className="demo-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article className="demo-stat-card" key={stat.id}>
              <div className="demo-stat-icon-wrap">
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className="demo-stat-details">
                <span className="demo-stat-title">{stat.title}</span>
                <strong className="demo-stat-value">{stat.value}</strong>
                <div className="demo-stat-footer">
                  <span
                    className={`demo-stat-badge ${stat.isPositive ? 'is-positive' : 'is-negative'}`}
                  >
                    {stat.isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {stat.change}
                  </span>
                  <span className="demo-stat-period">{stat.period}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <span className="demo-hint" aria-live="polite">
        DaisyUI-inspired responsive metrics grid with dynamic time filters.
      </span>
    </div>
  )
}

