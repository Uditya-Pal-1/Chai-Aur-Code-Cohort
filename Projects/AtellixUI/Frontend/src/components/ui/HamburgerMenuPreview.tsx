import { useState } from 'react'

const menuLinks = ['Overview', 'Components', 'Patterns', 'Resources']

export default function HamburgerMenuPreview() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Overview')

  return (
    <div className="demo-stack demo-hamburger-layout">
      <header className="demo-hamburger-header">
        <a className="demo-site-wordmark" href="#menu">ATX<span>.</span></a>
        <button className={`demo-hamburger-button ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="demo-hamburger-links" onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
      </header>
      <nav id="demo-hamburger-links" className={`demo-hamburger-links ${open ? 'is-open' : ''}`} aria-label="Preview navigation" aria-hidden={!open}>
        {menuLinks.map((link) => <button type="button" tabIndex={open ? 0 : -1} className={active === link ? 'is-active' : ''} key={link} onClick={() => { setActive(link); setOpen(false) }}>{link}<span aria-hidden="true">↗</span></button>)}
      </nav>
      <span className="demo-hint" aria-live="polite">Current page: {active}</span>
    </div>
  )
}
