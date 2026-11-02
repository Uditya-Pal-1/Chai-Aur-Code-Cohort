import { useState } from 'react'

const links = ['Work', 'About', 'Contact']

export default function NavBarLayoutPreview() {
  const [active, setActive] = useState('Work')

  return (
    <div className="demo-site-frame demo-nav-layout">
      <nav aria-label="Portfolio preview">
        <a className="demo-site-wordmark" href="#preview-home">STUDIO<span>.</span></a>
        <div>{links.map((link) => <a className={active === link ? 'is-active' : ''} href={`#preview-${link.toLowerCase()}`} key={link} onClick={(event) => { event.preventDefault(); setActive(link) }}>{link}</a>)}</div>
        <button className="demo-button demo-button-primary" type="button" onClick={() => setActive('Contact')}>Let’s talk <span aria-hidden="true">↗</span></button>
      </nav>
      <span className="demo-hint" aria-live="polite">Active destination: {active}</span>
    </div>
  )
}
