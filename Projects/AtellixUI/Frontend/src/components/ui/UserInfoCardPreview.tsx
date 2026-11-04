import { useState } from 'react'
import { Check, Code2, Globe, Mail, MapPin, Share2, UserPlus } from 'lucide-react'

export default function UserInfoCardPreview() {
  const [following, setFollowing] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('uditya@atellixui.dev')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="demo-stack demo-userinfo-wrap">
      <article className="demo-userinfo-card">
        <div className="demo-userinfo-banner">
          <div className="demo-userinfo-banner-glow" />
        </div>

        <div className="demo-userinfo-profile">
          <div className="demo-userinfo-avatar-wrap">
            <div className="demo-userinfo-avatar">
              <span>UP</span>
            </div>
            <span className="demo-avatar-online-dot" title="Available for projects" />
          </div>

          <div className="demo-userinfo-header-actions">
            <button
              type="button"
              className={`demo-button ${following ? 'demo-button-subtle' : 'demo-button-primary'}`}
              onClick={() => setFollowing(!following)}
            >
              {following ? (
                <>
                  <Check size={14} /> Following
                </>
              ) : (
                <>
                  <UserPlus size={14} /> Follow
                </>
              )}
            </button>
            <button
              type="button"
              className="demo-icon-button"
              onClick={handleCopyEmail}
              title={copiedEmail ? 'Email copied!' : 'Copy email address'}
              aria-label="Copy email"
            >
              {copiedEmail ? <Check size={15} color="#4ade80" /> : <Mail size={15} />}
            </button>
          </div>
        </div>

        <div className="demo-userinfo-details">
          <div className="demo-userinfo-name-row">
            <h4>Uditya Pal</h4>
            <span className="demo-badge demo-badge-primary">Architect</span>
          </div>
          <span className="demo-userinfo-handle">@Aman_pal_1</span>
          <p className="demo-userinfo-bio">
            Full-stack engineer crafting design-token architectures, accessible component libraries, and spatial Three.js UI interfaces.
          </p>

          <div className="demo-userinfo-location-row">
            <span className="demo-userinfo-meta-item">
              <MapPin size={13} /> India · Remote
            </span>
          </div>
        </div>

        <div className="demo-userinfo-stats-row">
          <div className="demo-userinfo-stat">
            <strong>55</strong>
            <small>Components</small>
          </div>
          <div className="demo-userinfo-stat">
            <strong>2.4k</strong>
            <small>Stars</small>
          </div>
          <div className="demo-userinfo-stat">
            <strong>1.2k</strong>
            <small>Followers</small>
          </div>
        </div>

        <div className="demo-userinfo-social-links">
          <a href="https://github.com/Uditya-Pal-1" target="_blank" rel="noreferrer" className="demo-social-pill">
            <Code2 size={14} /> GitHub
          </a>
          <a href="https://x.com/Aman_pal_1" target="_blank" rel="noreferrer" className="demo-social-pill">
            <Share2 size={14} /> X / Twitter
          </a>
          <a href="https://www.linkedin.com/in/udityapal/" target="_blank" rel="noreferrer" className="demo-social-pill">
            <Globe size={14} /> LinkedIn
          </a>
        </div>
      </article>
      <span className="demo-hint">
        DaisyUI user profile card with live status indicator, follower metrics, and action states.
      </span>
    </div>
  )
}
