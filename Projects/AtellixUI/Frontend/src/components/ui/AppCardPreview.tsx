import { useState } from 'react'
import { CheckCircle2, Clock, Star, TrendingUp } from 'lucide-react'

export default function AppCardPreview() {
  const [starred, setStarred] = useState(false)
  const [progress, setProgress] = useState(72)

  return (
    <div className="demo-stack demo-appcard-wrap">
      <article className="demo-appcard">
        <div className="demo-appcard-header">
          <div className="demo-appcard-badge-row">
            <span className="demo-badge demo-badge-primary">PRODUCTION</span>
            <span className="demo-badge demo-badge-subtle">v2.4.0</span>
          </div>
          <button
            type="button"
            className={`demo-icon-button ${starred ? 'is-starred' : ''}`}
            onClick={() => setStarred(!starred)}
            aria-label={starred ? 'Unstar project' : 'Star project'}
          >
            <Star size={16} fill={starred ? '#ff8a3d' : 'none'} color={starred ? '#ff8a3d' : 'currentColor'} />
          </button>
        </div>

        <div className="demo-appcard-body">
          <div className="demo-appcard-icon">
            <TrendingUp size={20} color="#ff8a3d" />
          </div>
          <div className="demo-appcard-title-group">
            <h4>Design Token Pipeline</h4>
            <p>Automated CSS variable extraction and AST transformation engine.</p>
          </div>
        </div>

        <div className="demo-appcard-progress-section">
          <div className="demo-appcard-progress-label">
            <span>Sprint Completion</span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="demo-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="demo-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="demo-appcard-footer">
          <div className="demo-avatar-stack" aria-label="Assigned team members">
            <span className="demo-avatar" title="Aman P.">AP</span>
            <span className="demo-avatar" title="Uditya P.">UP</span>
            <span className="demo-avatar" title="Sara K.">SK</span>
            <span className="demo-avatar-more">+3</span>
          </div>
          <div className="demo-appcard-meta">
            <Clock size={14} />
            <span>Updated 2h ago</span>
          </div>
        </div>

        <div className="demo-appcard-actions">
          <button
            type="button"
            className="demo-button demo-button-subtle"
            onClick={() => setProgress((p) => (p >= 100 ? 25 : p + 15))}
          >
            <CheckCircle2 size={15} />
            <span>Update status</span>
          </button>
          <button type="button" className="demo-button demo-button-primary">
            Open workspace →
          </button>
        </div>
      </article>
      <span className="demo-hint">
        SaaS application card with stacked avatars, progress meter, and responsive actions.
      </span>
    </div>
  )
}
