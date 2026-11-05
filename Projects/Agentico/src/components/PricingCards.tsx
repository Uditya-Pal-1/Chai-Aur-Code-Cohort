import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Zap } from 'lucide-react'

type Mode = 'managed' | 'build'
const tiers = [
  {
    name: 'Pilot', tagline: 'Prove ROI with one high-impact agent.',
    price: { managed: '$1,490', build: '$4,900' }, unit: { managed: '/mo + $2,900 setup', build: 'one-time' },
    cta: 'Start a pilot',
    features: ['1 production agent', 'Live in 21 days', 'Up to 3 integrations', 'Evaluation suite + guardrails', 'Human-in-the-loop approvals', '30 days of hypercare'],
  },
  {
    name: 'Growth', tagline: 'Build an AI team across departments.', popular: true,
    price: { managed: '$3,900', build: '$14,900' }, unit: { managed: '/mo', build: 'one-time' },
    cta: 'Book a scoping call',
    features: ['Up to 4 agents', 'Unlimited integrations', 'Voice, chat, email & Slack channels', 'Live performance dashboard', 'Monthly optimisation sprints', 'Priority Slack support'],
  },
  {
    name: 'Enterprise', tagline: 'Agents at scale with full governance.',
    price: { managed: 'Custom', build: 'Custom' }, unit: { managed: '', build: '' },
    cta: 'Talk to us',
    features: ['Unlimited agents', 'VPC / on-prem deployment', 'SSO, RBAC & audit logs', 'Custom model fine-tuning', '99.9% uptime SLA', 'Dedicated agent team'],
  },
]

export default function PricingCards() {
  const [mode, setMode] = useState<Mode>('managed')
  return (
    <div>
      <div className="mx-auto flex w-fit rounded-full border border-line bg-white p-1 text-sm">
        {([['managed', 'Fully managed'], ['build', 'Build & hand-off']] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} aria-pressed={mode === m}
            className={`rounded-full px-5 py-2 font-medium transition ${mode === m ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>{label}</button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-muted">
        {mode === 'managed' ? 'We host, monitor and keep improving your agents. Cancel anytime after 3 months.' : 'We build it, hand over code + prompts, and train your team to run it.'}
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {tiers.map(t => (
          <div key={t.name} className={`relative flex flex-col rounded-3xl border p-7 ${t.popular ? 'border-ink bg-ink text-white shadow-2xl shadow-accent/20 lg:-translate-y-3' : 'border-line bg-white'}`}>
            {t.popular && <span className="absolute -top-3 left-7 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <p className={`mt-1 text-sm ${t.popular ? 'text-white/60' : 'text-muted'}`}>{t.tagline}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight">{t.price[mode]}</span>
              <span className={`text-sm ${t.popular ? 'text-white/60' : 'text-muted'}`}>{t.unit[mode]}</span>
            </div>
            <Link to="/book" className={`mt-7 rounded-full py-3 text-center font-medium ${t.popular ? 'bg-white text-ink hover:bg-white/90' : 'bg-ink text-white hover:bg-ink-2'}`}>{t.cta}</Link>
            <ul className="mt-7 space-y-3 text-sm">
              {t.features.map(f => (
                <li key={f} className="flex gap-3"><Check className={`h-4 w-4 shrink-0 ${t.popular ? 'text-coral' : 'text-accent'}`} />{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-accent/40 bg-accent/5 p-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white"><Zap className="h-5 w-5" /></span>
          <div>
            <h4 className="font-semibold">Prefer to pay only for results?</h4>
            <p className="text-sm text-muted">Outcome-based pricing from <b className="text-ink">$0.40 per completed task</b>: resolved tickets, booked meetings, processed invoices. No outcome, no charge.</p>
          </div>
        </div>
        <Link to="/book" className="shrink-0 rounded-full border border-ink px-5 py-2 text-sm font-medium hover:bg-ink hover:text-white">Ask about outcome pricing</Link>
      </div>
    </div>
  )
}
