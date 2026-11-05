import { useState, type FC, type MouseEvent, type PointerEvent } from 'react'
import { ArrowDown, ArrowUpRight, Check, Copy, Code2, Sparkles } from 'lucide-react'
import lightLogo from '../assets/atellix-logo.webp'
import darkLogo from '../assets/atellix-logo-dark-transparent.webp'

interface FooterProps {
  theme?: 'dark' | 'light'
  onNavigate?: (path: string) => void
}

const installCommand = 'npm run dev'

export const Footer: FC<FooterProps> = ({ theme = 'dark', onNavigate }) => {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!onNavigate) return
    event.preventDefault()
    onNavigate(path)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setCopyError(false)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      console.error('Unable to copy the AtellixUI command:', error)
      setCopied(false)
      setCopyError(true)
      window.setTimeout(() => setCopyError(false), 3000)
    }
  }

  const updateGlow = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }

  const resetGlow = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--glow-x', '78%')
    event.currentTarget.style.setProperty('--glow-y', '50%')
  }

  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <div
          className="footer-intro"
          onPointerMove={updateGlow}
          onPointerLeave={resetGlow}
        >
          <div className="footer-brand-block">
            <a href="/" className="footer-brand" onClick={(event) => handleClick(event, '/')}>
              <img
                src={theme === 'light' ? lightLogo : darkLogo}
                alt=""
                width={720}
                height={240}
                loading="lazy"
                decoding="async"
              />
            </a>
            <p>
              Thoughtful React components, a living token system, and the details that make interfaces feel complete.
            </p>
            <span className="footer-live-status"><i /> IN ACTIVE DEVELOPMENT</span>
          </div>

          <div className="footer-cta-card">
            <div className="footer-orbit" aria-hidden="true"><i /><i /><i /><span /></div>
            <span className="eyebrow"><Sparkles size={13} aria-hidden="true" /> BUILD WITH INTENTION</span>
            <h2>Make your next interface feel considered.</h2>
            <div className="footer-cta-actions">
              <a href="/components" onClick={(event) => handleClick(event, '/components')}>
                Explore components <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <button type="button" className="footer-copy-command" onClick={handleCopy}>
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copied' : copyError ? 'Clipboard blocked' : 'Copy dev command'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-link-grid">
          <nav aria-label="Explore AtellixUI">
            <h2>Explore</h2>
            <a href="/components" onClick={(event) => handleClick(event, '/components')}>Component library <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/themes" onClick={(event) => handleClick(event, '/themes')}>Theme studio <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/playground" onClick={(event) => handleClick(event, '/playground')}>Live playground <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/shop" onClick={(event) => handleClick(event, '/shop')}>Blocks &amp; templates <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/pricing" onClick={(event) => handleClick(event, '/pricing')}>Pricing <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/blog" onClick={(event) => handleClick(event, '/blog')}>Journal <ArrowUpRight size={12} aria-hidden="true" /></a>
          </nav>
          <nav aria-label="Design resources">
            <h2>Foundations</h2>
            <a href="/system" onClick={(event) => handleClick(event, '/system')}>Design system <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/themes" onClick={(event) => handleClick(event, '/themes')}>Color &amp; tokens <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/about" onClick={(event) => handleClick(event, '/about')}>About AtellixUI <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/privacy" onClick={(event) => handleClick(event, '/privacy')}>Privacy <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/terms" onClick={(event) => handleClick(event, '/terms')}>Terms of use <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/license" onClick={(event) => handleClick(event, '/license')}>License &amp; copyright <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="/copyright" onClick={(event) => handleClick(event, '/copyright')}>Copyright notice <ArrowUpRight size={12} aria-hidden="true" /></a>
          </nav>
          <nav aria-label="Connect with AtellixUI">
            <h2>Connect</h2>
            <a href="https://github.com/Uditya-Pal-1" target="_blank" rel="noreferrer"><Code2 size={14} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="https://my-portfolio-uditya-pal.vercel.app/" target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={12} aria-hidden="true" /></a>
          </nav>
          <div className="footer-principles">
            <span className="footer-principles-mark" aria-hidden="true">A</span>
            <p>Designed around useful motion, accessible contrast, and a consistent visual language.</p>
            <span className="footer-principles-note">REACT · TYPESCRIPT · DESIGN TOKENS</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AtellixUI <i /> Architected by Uditya Pal</span>
          <a className="footer-back-top" href="#top">
            Back to top <ArrowDown size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
