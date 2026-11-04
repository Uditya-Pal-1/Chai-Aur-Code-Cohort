import { Box, Code2, Cpu, Pause, Play, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { useState } from 'react'

const engineeringPatterns = [
  { name: 'React', count: 'Composable UI', role: 'Reusable component patterns', icon: Code2 },
  { name: 'TypeScript', count: 'Typed examples', role: 'Clear component interfaces', icon: ShieldCheck },
  { name: 'Design tokens', count: 'Shared foundations', role: 'Consistent visual decisions', icon: Sparkles },
  { name: 'Tailwind CSS', count: 'Utility-first styles', role: 'Adaptable interface styling', icon: Zap },
  { name: 'Color contrast', count: 'Live feedback', role: 'More informed palette choices', icon: TrendingUp },
  { name: 'Responsive UI', count: 'Flexible layouts', role: 'Designed for smaller screens', icon: Box },
  { name: 'Keyboard access', count: 'Visible focus', role: 'Controls you can navigate', icon: Users },
  { name: 'Reduced motion', count: 'User preference', role: 'Motion that respects settings', icon: Cpu },
]

const platformMetrics = [
  { label: 'Interactive component previews', detail: 'Try states before adapting patterns', badge: 'COMPONENTS' },
  { label: 'Live theme controls', detail: 'Explore accents on real interface examples', badge: 'THEMES' },
  { label: 'Copyable React examples', detail: 'Inspect and adapt component source', badge: 'SOURCE' },
  { label: 'Color contrast feedback', detail: 'Check accent readability as you tune', badge: 'ACCESSIBILITY' },
  { label: 'Responsive layouts', detail: 'Explore patterns across viewport sizes', badge: 'LAYOUT' },
  { label: 'Reduced-motion support', detail: 'Respect motion preferences', badge: 'MOTION' },
  { label: 'Dark and light themes', detail: 'Preview both surface foundations', badge: 'THEMES' },
  { label: 'Design token reference', detail: 'Copy useful spacing and type values', badge: 'TOKENS' },
]

export default function MncMarqueeTicker() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="mnc-marquee-section" aria-label="AtellixUI engineering patterns and features">
      <div className="mnc-marquee-header wrap">
        <span className="eyebrow">A PRACTICAL TOOLKIT FOR THE WEB</span>
        <h3>Grounded in familiar engineering patterns.</h3>
        <p className="lead">
          Explore the foundations behind the component library: reusable React patterns, live design tokens, and accessible interaction details.
        </p>
        <button
          type="button"
          className="mnc-motion-toggle"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-pressed={isPaused}
        >
          {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {isPaused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>

      <div className={`mnc-marquee-wrapper ${isPaused ? 'is-paused' : ''}`}>
        {/* Row 1: Core engineering patterns */}
        <div className="mnc-marquee-track is-rtl" role="region" aria-label="Engineering patterns">
          <div className="mnc-marquee-group">
            {engineeringPatterns.map((item, idx) => {
              const Icon = item.icon
              return (
                <div className="mnc-marquee-card" key={`r1-a-${idx}`}>
                  <div className="mnc-card-company">
                    <span className="mnc-icon-badge">
                      <Icon size={14} color="#ff8a3d" />
                    </span>
                    <strong>{item.name}</strong>
                  </div>
                  <span className="mnc-divider">/</span>
                  <span className="mnc-card-count">{item.count}</span>
                  <span className="mnc-divider">·</span>
                  <span className="mnc-card-role">{item.role}</span>
                </div>
              )
            })}
          </div>
          {/* Duplicate for seamless scrolling */}
          <div className="mnc-marquee-group" aria-hidden="true">
            {engineeringPatterns.map((item, idx) => {
              const Icon = item.icon
              return (
                <div className="mnc-marquee-card" key={`r1-b-${idx}`}>
                  <div className="mnc-card-company">
                    <span className="mnc-icon-badge">
                      <Icon size={14} color="#ff8a3d" />
                    </span>
                    <strong>{item.name}</strong>
                  </div>
                  <span className="mnc-divider">/</span>
                  <span className="mnc-card-count">{item.count}</span>
                  <span className="mnc-divider">·</span>
                  <span className="mnc-card-role">{item.role}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Row 2: Product capabilities */}
        <div className="mnc-marquee-track is-ltr" role="region" aria-label="AtellixUI product capabilities">
          <div className="mnc-marquee-group">
            {platformMetrics.map((item, idx) => (
              <div className="mnc-marquee-card is-metric" key={`r2-a-${idx}`}>
                <span className="demo-badge demo-badge-primary">{item.badge}</span>
                <strong>{item.label}</strong>
                <span className="mnc-divider">·</span>
                <span className="mnc-card-detail">{item.detail}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for infinite seamless scroll */}
          <div className="mnc-marquee-group" aria-hidden="true">
            {platformMetrics.map((item, idx) => (
              <div className="mnc-marquee-card is-metric" key={`r2-b-${idx}`}>
                <span className="demo-badge demo-badge-primary">{item.badge}</span>
                <strong>{item.label}</strong>
                <span className="mnc-divider">·</span>
                <span className="mnc-card-detail">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
