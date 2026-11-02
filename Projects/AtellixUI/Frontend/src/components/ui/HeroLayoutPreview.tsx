import { useState } from 'react'

export default function HeroLayoutPreview() {
  const [copied, setCopied] = useState(false)
  const [exploring, setExploring] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('npm create atellix@latest')
      setCopied(true)
    } catch (error) {
      console.error('Unable to copy the hero install command.', error)
      setCopied(false)
    }
  }

  return (
    <section className="demo-site-frame demo-hero-layout">
      <span className="demo-eyebrow">DESIGN SYSTEM · 2026</span>
      <h4>Build with a little more <em>intention.</em></h4>
      <p>Start from a thoughtful foundation. Make every interface feel like it belongs.</p>
      <div className="demo-actions"><button className="demo-button demo-button-primary" type="button" onClick={() => setExploring((value) => !value)}>{exploring ? 'System selected' : 'Explore the system'} <span aria-hidden="true">↗</span></button><button className="demo-button" type="button" onClick={() => { void copy() }}>{copied ? 'Copied' : 'Copy install command'}</button></div>
    </section>
  )
}
