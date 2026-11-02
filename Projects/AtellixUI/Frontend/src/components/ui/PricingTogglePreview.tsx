import { useState } from 'react'

export default function PricingTogglePreview() {
  const [annual, setAnnual] = useState(true)
  const monthlyPrice = 18
  const price = annual ? Math.round(monthlyPrice * 0.8) : monthlyPrice

  return (
    <div className="demo-stack">
      <div className="demo-pricing-toggle" role="group" aria-label="Billing period">
        <button className={!annual ? 'is-selected' : ''} type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
        <button className={annual ? 'is-selected' : ''} type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>Yearly <span>−20%</span></button>
      </div>
      <div className="demo-pricing-card">
        <span>Studio</span>
        <strong>${price}<small> / seat / month</small></strong>
        <p>{annual ? 'Billed annually · $' + price * 12 + ' per seat' : 'Billed monthly · cancel anytime'}</p>
        <button className="demo-button demo-button-primary" type="button">Choose Studio</button>
      </div>
      <span className="demo-hint">Pricing is an illustrative, local preview.</span>
    </div>
  )
}
