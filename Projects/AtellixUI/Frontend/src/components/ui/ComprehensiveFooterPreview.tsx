import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Code2, Globe, Share2 } from 'lucide-react'

export default function ComprehensiveFooterPreview() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="demo-stack demo-comp-footer-wrap">
      <footer className="demo-comp-footer">
        <div className="demo-comp-footer-grid">
          <div className="demo-comp-footer-brand-col">
            <div className="demo-navbar-brand mb-2">
              <div className="demo-navbar-logo-symbol" aria-hidden="true">
                <span className="demo-logo-core" />
              </div>
              <strong>Atellix<span>UI</span></strong>
            </div>
            <p className="demo-comp-footer-desc">
              Token-driven, animation-first React component system built to make every interface on-brand and production-ready.
            </p>
            <form className="demo-footer-newsletter-form" onSubmit={handleSubscribe}>
              <span className="demo-footer-newsletter-title">Stay updated on new components</span>
              <div className="demo-footer-input-row">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="demo-button demo-button-primary">
                  {subscribed ? <Check size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
              {subscribed && (
                <small className="demo-footer-success">✓ You are subscribed to component releases.</small>
              )}
            </form>
          </div>

          <div className="demo-comp-footer-col">
            <h5>Components</h5>
            <ul>
              <li><a href="#buttons">Buttons & Sliders</a></li>
              <li><a href="#tables">Data Tables & Grids</a></li>
              <li><a href="#cards">Application Cards</a></li>
              <li><a href="#overlays">Modals & Toasts</a></li>
              <li><a href="#navs">Glass Navbars</a></li>
            </ul>
          </div>

          <div className="demo-comp-footer-col">
            <h5>Ecosystem</h5>
            <ul>
              <li><a href="#cli">Atellix CLI (npx)</a></li>
              <li><a href="#mcp">MCP AI Server</a></li>
              <li><a href="#hooks">@atellix/hooks</a></li>
              <li><a href="#tokens">Design Tokens</a></li>
              <li><a href="#studio">Atellix Studio</a></li>
            </ul>
          </div>

          <div className="demo-comp-footer-col">
            <h5>Community</h5>
            <ul>
              <li><a href="https://github.com/Uditya-Pal-1" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://x.com/Aman_pal_1" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href="https://www.linkedin.com/in/udityapal/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://my-portfolio-uditya-pal.vercel.app/" target="_blank" rel="noreferrer">Portfolio</a></li>
            </ul>
          </div>
        </div>

        <div className="demo-comp-footer-bottom">
          <span>© {new Date().getFullYear()} AtellixUI. Architected by Uditya Pal.</span>
          <div className="demo-comp-footer-socials">
            <a href="https://github.com/Uditya-Pal-1" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Code2 size={16} />
            </a>
            <a href="https://x.com/Aman_pal_1" target="_blank" rel="noreferrer" aria-label="X">
              <Share2 size={16} />
            </a>
            <a href="https://www.linkedin.com/in/udityapal/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Globe size={16} />
            </a>
          </div>
        </div>
      </footer>
      <span className="demo-hint">
        DaisyUI footer pattern with newsletter subscription, multi-column navigation, and social links.
      </span>
    </div>
  )
}
