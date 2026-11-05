import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Clock, Video } from 'lucide-react'
import { departments } from '../data'

const sizes = ['1–10', '11–50', '51–200', '201–1,000', '1,000+']
const tools = ['HubSpot', 'Salesforce', 'Zendesk', 'Intercom', 'Slack', 'Google Workspace', 'Microsoft 365', 'Shopify', 'NetSuite', 'QuickBooks']
const slots = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']
const stepNames = ['Goals', 'Company', 'Details', 'Schedule']

function nextWeekdays(n: number) {
  const out: Date[] = []
  const d = new Date()
  while (out.length < n) { d.setDate(d.getDate() + 1); if (d.getDay() % 6 !== 0) out.push(new Date(d)) }
  return out
}

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-pressed={on} className={`rounded-full border px-4 py-2 text-sm transition ${on ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'}`}>{children}</button>
}

export default function Book() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [goals, setGoals] = useState<string[]>([])
  const [size, setSize] = useState('')
  const [stack, setStack] = useState<string[]>([])
  const [form, setForm] = useState({ name: '', email: params.get('email') ?? '', company: '', notes: '' })
  const days = useMemo(() => nextWeekdays(5), [])
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState('')
  const [done, setDone] = useState(false)

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter(x => x !== v) : [...list, v])
  const valid = [goals.length > 0, !!size, !!form.name && /\S+@\S+\.\S+/.test(form.email) && !!form.company, !!slot][step]
  const dayLabel = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  if (done) return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint/15 text-mint"><CalendarCheck className="h-8 w-8" /></span>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">You’re booked, {form.name.split(' ')[0]}!</h1>
      <p className="mt-3 text-muted">A calendar invite is on its way to <b className="text-ink">{form.email}</b>.</p>
      <div className="mt-8 rounded-3xl border border-line bg-white p-6 text-left text-sm">
        <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-accent" /> {dayLabel(days[day])} · {slot} (your time) · 30 min</div>
        <div className="mt-3 flex items-center gap-3"><Video className="h-4 w-4 text-accent" /> Google Meet link in your invite</div>
        <div className="mt-4 border-t border-line pt-4 text-muted">We’ll come prepared with automation ideas for <b className="text-ink">{goals.join(', ')}</b> at {form.company}.</div>
      </div>
      <Link to="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-medium text-white">Back to home</Link>
    </section>
  )

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-[2rem] border border-line bg-white p-6 md:p-10">
        <div className="flex gap-2">
          {stepNames.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition ${i <= step ? 'bg-gradient-brand' : 'bg-line'}`} />
              <div className={`mt-2 text-xs ${i === step ? 'font-semibold text-ink' : 'text-muted'}`}>{i + 1}. {s}</div>
            </div>
          ))}
        </div>

        <form className="mt-10" onSubmit={e => { e.preventDefault(); if (!valid) return; if (step < 3) setStep(step + 1); else setDone(true) }}>
          <div key={step} className="animate-fadeup min-h-[300px]">
            {step === 0 && (<>
              <h1 className="text-3xl font-semibold tracking-tight">What would you like to automate?</h1>
              <p className="mt-2 text-muted">Pick all that apply. We’ll tailor the audit to these areas.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {departments.map(d => {
                  const on = goals.includes(d.label)
                  return (
                    <button type="button" key={d.id} onClick={() => toggle(goals, setGoals, d.label)} aria-pressed={on}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${on ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-ink/40'}`}>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${on ? 'bg-ink text-white' : 'bg-paper'}`}><d.icon className="h-4 w-4" /></span>
                      <span><span className="block font-semibold">{d.label}</span><span className="block text-xs text-muted">{d.agents.map(a => a.name).join(' · ')}</span></span>
                    </button>
                  )
                })}
              </div>
            </>)}
            {step === 1 && (<>
              <h2 className="text-3xl font-semibold tracking-tight">Tell us about your company</h2>
              <p className="mt-6 text-sm font-medium">Team size</p>
              <div className="mt-3 flex flex-wrap gap-2">{sizes.map(s => <Chip key={s} on={size === s} onClick={() => setSize(s)}>{s}</Chip>)}</div>
              <p className="mt-8 text-sm font-medium">Tools you use <span className="font-normal text-muted">(optional)</span></p>
              <div className="mt-3 flex flex-wrap gap-2">{tools.map(t => <Chip key={t} on={stack.includes(t)} onClick={() => toggle(stack, setStack, t)}>{t}</Chip>)}</div>
            </>)}
            {step === 2 && (<>
              <h2 className="text-3xl font-semibold tracking-tight">Where should we send the invite?</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {([['name', 'Full name', 'text'], ['email', 'Work email', 'email'], ['company', 'Company', 'text']] as const).map(([k, l, t]) => (
                  <label key={k} className={k === 'company' ? 'sm:col-span-2' : ''}>
                    <span className="text-sm font-medium">{l}</span>
                    <input type={t} required value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-ink" />
                  </label>
                ))}
                <label className="sm:col-span-2">
                  <span className="text-sm font-medium">What’s the biggest bottleneck right now? <span className="font-normal text-muted">(optional)</span></span>
                  <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-ink" />
                </label>
              </div>
            </>)}
            {step === 3 && (<>
              <h2 className="text-3xl font-semibold tracking-tight">Pick a time for your audit</h2>
              <p className="mt-2 text-muted">30 minutes with a senior agent strategist.</p>
              <div className="mt-8 grid grid-cols-5 gap-2">
                {days.map((d, i) => (
                  <button type="button" key={i} onClick={() => { setDay(i); setSlot('') }} className={`rounded-2xl border p-3 text-center transition ${day === i ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}>
                    <div className="text-xs opacity-70">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="text-xl font-semibold">{d.getDate()}</div>
                  </button>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((s, i) => {
                  const taken = (i + day) % 4 === 0
                  return <button type="button" key={s} disabled={taken} onClick={() => setSlot(s)} className={`rounded-xl border py-3 text-sm transition ${taken ? 'cursor-not-allowed border-line text-line line-through' : slot === s ? 'border-accent bg-accent text-white' : 'border-line hover:border-ink'}`}>{s}</button>
                })}
              </div>
            </>)}
          </div>
          <div className="mt-10 flex items-center justify-between">
            {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}
            <button disabled={!valid} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-30">
              {step < 3 ? 'Continue' : 'Confirm booking'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-5">
        <div className="rounded-[2rem] bg-ink p-8 text-white">
          <h3 className="text-xl font-semibold">What you’ll get in 30 minutes</h3>
          <ul className="mt-5 space-y-3 text-white/75">
            {['Your top 3 automation opportunities, ranked by ROI', 'A rough build plan and timeline for each', 'Honest advice, including when not to use AI', 'A fixed-fee pilot proposal within 48 hours'].map(t => <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" />{t}</li>)}
          </ul>
        </div>
        <figure className="rounded-[2rem] border border-line bg-white p-8">
          <blockquote className="font-serif text-2xl leading-snug">“The audit alone was worth it. We left with a clear plan and an agent live three weeks later.”</blockquote>
          <figcaption className="mt-4 text-sm text-muted">Sophie Laurent · COO, Atlas & Co.</figcaption>
        </figure>
      </aside>
    </section>
  )
}
