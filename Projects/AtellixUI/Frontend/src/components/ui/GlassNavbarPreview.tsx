import { useState } from 'react'
import { Bell, ChevronDown, Menu, Search, X } from 'lucide-react'

export default function GlassNavbarPreview() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')

  const navLinks = ['Overview', 'Primitives', 'Ecosystem', 'Docs']

  return (
    <div className="demo-stack demo-glass-navbar-wrap">
      <header className="demo-glass-navbar">
        <div className="demo-navbar-brand">
          <div className="demo-navbar-logo-symbol" aria-hidden="true">
            <span className="demo-logo-core" />
          </div>
          <strong>Atellix<span>UI</span></strong>
          <span className="demo-badge demo-badge-subtle">v2.1</span>
        </div>

        <nav className="demo-navbar-links" aria-label="Main demo navigation">
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              className={`demo-navbar-link ${activeTab === link ? 'is-active' : ''}`}
              onClick={() => setActiveTab(link)}
            >
              {link}
            </button>
          ))}
          <div className="demo-navbar-dropdown-wrap">
            <button
              type="button"
              className="demo-navbar-link has-arrow"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              Resources <ChevronDown size={14} className={dropdownOpen ? 'is-rotated' : ''} />
            </button>
            {dropdownOpen && (
              <div className="demo-navbar-dropdown-menu">
                <a href="#github" onClick={(e) => { e.preventDefault(); setDropdownOpen(false) }}>GitHub Repository ↗</a>
                <a href="#mcp" onClick={(e) => { e.preventDefault(); setDropdownOpen(false) }}>MCP Server Spec</a>
                <a href="#tokens" onClick={(e) => { e.preventDefault(); setDropdownOpen(false) }}>Design Token Store</a>
              </div>
            )}
          </div>
        </nav>

        <div className="demo-navbar-right">
          <div className="demo-navbar-search-inline">
            <Search size={14} />
            <input type="text" placeholder="Quick search..." aria-label="Search components" />
            <kbd>⌘K</kbd>
          </div>
          <button type="button" className="demo-icon-button has-notification" aria-label="View notifications">
            <Bell size={16} />
            <span className="demo-notification-dot" />
          </button>
          <button type="button" className="demo-button demo-button-primary demo-nav-cta-btn">
            Get Started
          </button>
          <button
            type="button"
            className="demo-mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="demo-navbar-mobile-drawer">
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              className={activeTab === link ? 'is-active' : ''}
              onClick={() => {
                setActiveTab(link)
                setMobileOpen(false)
              }}
            >
              {link}
            </button>
          ))}
          <button type="button" className="demo-button demo-button-primary w-full mt-2">
            Explore Components ↗
          </button>
        </div>
      )}

      <span className="demo-hint">
        DaisyUI navbar pattern featuring backdrop blur, interactive dropdowns, and responsive mobile drawer.
      </span>
    </div>
  )
}

