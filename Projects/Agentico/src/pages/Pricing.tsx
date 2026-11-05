import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import PricingCards from '../components/PricingCards'
import SectionHeading from '../components/SectionHeading'
import Faq from '../components/Faq'
import CtaBand from '../components/CtaBand'

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

function Slider({ label, value, set, min, max, step, suffix }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; suffix: string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm"><span className="text-muted">{label}</span><span className="font-semibold">{value.toLocaleString('en-US')} {suffix}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} className="mt-3 w-full accent-[#5b4bff]" />
    </label>
  )
}

function Roi() {
  const [tasks, setTasks] = useState(2000)
  const [minutes, setMinutes] = useState(8)
  const [rate, setRate] = useState(35)
  const [auto, setAuto] = useState(70)
  const hours = (tasks * minutes / 60) * (auto / 100)
  const saved = hours * rate
  const cost = 3900
  const net = saved - cost
  const payback = saved > cost ? Math.max(1, Math.round(14900 / (saved) * 4.3)) : null
  return (
    <section id="roi" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24">
      <SectionHeading eyebrow="ROI calculator" title={<>See what an agent is <span className="font-serif font-normal italic">worth to you.</span></>} sub="Move the sliders to match one workflow. Estimates assume the Growth plan, fully managed." />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <div className="space-y-8 rounded-3xl border border-line bg-white p-8">
          <Slider label="Tasks per month" value={tasks} set={setTasks} min={100} max={20000} step={100} suffix="tasks" />
          <Slider label="Minutes a human spends per task" value={minutes} set={setMinutes} min={1} max={60} step={1} suffix="min" />
          <Slider label="Fully-loaded hourly cost" value={rate} set={setRate} min={15} max={150} step={5} suffix="$/h" />
          <Slider label="Share handled by the agent" value={auto} set={setAuto} min={10} max={95} step={5} suffix="%" />
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-white">
          <div>
            <div className="text-sm text-white/60">Estimated monthly savings</div>
            <div className="mt-2 text-6xl font-semibold tracking-tight text-gradient md:text-7xl">{fmt(saved)}</div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/60">Hours freed / month</div><div className="mt-1 text-2xl font-semibold">{Math.round(hours).toLocaleString('en-US')}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/60">Net after plan cost</div><div className={`mt-1 text-2xl font-semibold ${net < 0 ? 'text-coral' : 'text-mint'}`}>{fmt(net)}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/60">Annual impact</div><div className="mt-1 text-2xl font-semibold">{fmt(net * 12)}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/60">Equivalent FTEs</div><div className="mt-1 text-2xl font-semibold">{(hours / 160).toFixed(1)}</div></div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-white/60">{payback ? `Typical payback on a build: ~${payback} weeks.` : 'Low volume? Outcome-based pricing may fit better.'}</p>
            <Link to="/book" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink">Validate this on a call</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const rows: [string, (string | boolean)[]][] = [
  ['Production agents', ['1', 'Up to 4', 'Unlimited']],
  ['Time to first agent', ['21 days', '21 days', '21–30 days']],
  ['Integrations', ['3', 'Unlimited', 'Unlimited + custom']],
  ['Channels', ['1', 'All', 'All']],
  ['Evaluation suite & guardrails', [true, true, true]],
  ['Human-in-the-loop approvals', [true, true, true]],
  ['Performance dashboard', [false, true, true]],
  ['Monthly optimisation sprints', [false, true, true]],
  ['SSO, RBAC & audit export', [false, false, true]],
  ['VPC / on-prem deployment', [false, false, true]],
  ['Uptime SLA', ['—', '99.5%', '99.9%']],
  ['Support', ['Email', 'Priority Slack', 'Dedicated team']],
]

function Compare() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12">
      <h2 className="text-center text-3xl font-semibold tracking-tight">Compare plans</h2>
      <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-white">
        <table className="w-full min-w-[620px] text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="p-5 font-medium text-muted">Feature</th>
              {['Pilot', 'Growth', 'Enterprise'].map(p => <th key={p} className={`p-5 text-base font-semibold ${p === 'Growth' ? 'text-accent' : ''}`}>{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([f, vals]) => (
              <tr key={f} className="border-b border-line last:border-0">
                <td className="p-5 text-ink-2">{f}</td>
                {vals.map((v, i) => (
                  <td key={i} className="p-5">{typeof v === 'boolean' ? (v ? <Check className="h-4 w-4 text-mint" /> : <Minus className="h-4 w-4 text-line" />) : v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const pricingFaqs = [
  { q: 'What’s the difference between Fully managed and Build & hand-off?', a: 'Fully managed means we host, monitor and keep improving your agents for a monthly fee. Build & hand-off is a one-time project: you get the code, prompts and runbooks, and your team runs it.' },
  { q: 'How does outcome-based pricing work?', a: 'We agree on a measurable outcome (resolved ticket, booked meeting, processed invoice) and a per-outcome price, typically $0.40–$4. You get a monthly invoice for verified outcomes only, with a platform minimum on low volumes.' },
  { q: 'Are LLM and infrastructure costs included?', a: 'Yes, on managed plans model usage is included up to a generous fair-use limit. We pass through costs at no markup beyond that, and you can bring your own API keys.' },
  { q: 'Can we start with a pilot and upgrade?', a: '100% of your Pilot build fee is credited toward the Growth plan if you upgrade within 60 days.' },
  { q: 'Is there a minimum commitment?', a: 'Managed plans have a 3-month minimum, then are month-to-month. Build projects are fixed-fee with milestones.' },
]

export default function Pricing() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 text-center">
          <h1 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">Pricing that pays for itself <span className="font-serif font-normal italic text-gradient">in weeks.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">Start with a fixed-fee pilot. Scale with a managed plan or pay only for outcomes. Pilot fees are fully credited when you upgrade.</p>
          <div className="mt-12 text-left"><PricingCards /></div>
        </div>
      </section>
      <Roi />
      <Compare />
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight">Pricing FAQ</h2>
        <Faq items={pricingFaqs} />
      </section>
      <CtaBand />
    </>
  )
}
