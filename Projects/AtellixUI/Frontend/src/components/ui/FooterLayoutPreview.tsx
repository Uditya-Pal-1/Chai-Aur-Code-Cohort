import { useState } from 'react'

const groups = [
  { title: 'Explore', links: ['Components', 'Templates', 'Changelog'] },
  { title: 'Company', links: ['About', 'Contact', 'Privacy'] },
]

export default function FooterLayoutPreview() {
  const [notice, setNotice] = useState('')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@atellixui.dev')
      setNotice('Email copied.')
    } catch (error) {
      console.error('Unable to copy the contact email.', error)
      setNotice('Unable to copy email.')
    }
  }

  return (
    <footer className="demo-site-frame demo-footer-layout">
      <div className="demo-footer-top">
        <div><a className="demo-site-wordmark" href="#footer">ATELLIX<span>.</span></a><p>Thoughtful interfaces for the people who build them.</p></div>
        {groups.map((group) => <div className="demo-footer-group" key={group.title}><strong>{group.title}</strong>{group.links.map((link) => <a href={`#${link.toLowerCase()}`} key={link} onClick={(event) => { event.preventDefault(); setNotice(`${link} link selected.`) }}>{link}</a>)}</div>)}
      </div>
      <div className="demo-footer-bottom"><span>© 2026 AtellixUI</span><button type="button" onClick={() => { void copyEmail() }}>hello@atellixui.dev</button></div>
      <span className="demo-hint" role="status">{notice}</span>
    </footer>
  )
}
