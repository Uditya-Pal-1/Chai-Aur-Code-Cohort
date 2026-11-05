import { useEffect, useState } from 'react'
import { Check, Loader2, ShieldCheck, Sparkles } from 'lucide-react'

type Step = { text: string; tool: string }
const runs: { agent: string; trigger: string; steps: Step[]; approval: string; result: string }[] = [
  {
    agent: 'Support Agent', trigger: '“My order #4821 arrived damaged, can I get a refund?”',
    steps: [
      { text: 'Classified intent: refund · damaged item', tool: 'LLM' },
      { text: 'Fetched order #4821 · $42.10 · delivered 2 days ago', tool: 'Shopify' },
      { text: 'Checked policy: eligible within 30 days', tool: 'Knowledge' },
    ],
    approval: 'Issue $42.10 refund to Visa •• 4242',
    result: 'Refund issued · customer notified · ticket closed (CSAT 5★)',
  },
  {
    agent: 'Sales Agent', trigger: 'New demo request: jane@northwind.com',
    steps: [
      { text: 'Enriched lead: Northwind Retail · 420 employees · Series C', tool: 'Clearbit' },
      { text: 'ICP score 91/100 · routed to AE West', tool: 'HubSpot' },
      { text: 'Drafted personalised reply with 3 time slots', tool: 'Gmail' },
    ],
    approval: 'Send reply and hold Thu 2:00pm on Alex’s calendar',
    result: 'Meeting booked · deal created ($38k pipeline)',
  },
  {
    agent: 'Finance Agent', trigger: 'Invoice INV-2290 received from Acme Supplies',
    steps: [
      { text: 'Extracted 14 line items · total $8,412.00', tool: 'OCR' },
      { text: '3-way match against PO-1187 ✓', tool: 'NetSuite' },
      { text: 'Coded to GL 6100 · Office & Facilities', tool: 'NetSuite' },
    ],
    approval: 'Schedule $8,412.00 payment for Nov 14',
    result: 'Payment scheduled · audit log saved',
  },
]

export default function AgentConsole() {
  const [run, setRun] = useState(0)
  const [tick, setTick] = useState(2)
  const r = runs[run]
  const total = r.steps.length + 3

  useEffect(() => {
    const t = setTimeout(() => {
      if (tick >= total) { setRun((run + 1) % runs.length); setTick(0) } else setTick(tick + 1)
    }, tick === r.steps.length + 1 ? 1800 : tick >= total ? 2600 : 1100)
    return () => clearTimeout(t)
  }, [tick, run, total, r.steps.length])

  const approved = tick > r.steps.length + 1
  const done = tick > r.steps.length + 2

  return (
    <div className="relative rounded-3xl border border-white/10 bg-ink p-1.5 shadow-2xl shadow-accent/20">
      <div className="rounded-[20px] bg-[#15151c] p-5 text-left text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand"><Sparkles className="h-4 w-4" /></span>
            <div>
              <div className="text-sm font-semibold">{r.agent}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> live · run #{1042 + run}</div>
            </div>
          </div>
          <div className="flex gap-1">
            {runs.map((x, i) => (
              <button key={x.agent} onClick={() => { setRun(i); setTick(0) }} aria-label={x.agent}
                className={`h-1.5 rounded-full transition-all ${i === run ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-white/5 p-3 text-sm text-white/80">
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Trigger</div>
          <div className="mt-1">{r.trigger}</div>
        </div>

        <ol className="mt-4 space-y-2.5 min-h-[250px]">
          {r.steps.map((s, i) => tick > i && (
            <li key={run + s.text} className="animate-fadeup flex items-start gap-3 text-sm">
              {tick > i + 1 || i < tick - 1 ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" /> : <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-accent-2" />}
              <span className="flex-1 text-white/85">{s.text}</span>
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60">{s.tool}</span>
            </li>
          ))}
          {tick > r.steps.length && (
            <li key={run + 'approval'} className="animate-fadeup rounded-xl border border-coral/40 bg-coral/10 p-3 text-sm">
              <div className="flex items-center gap-2 text-coral"><ShieldCheck className="h-4 w-4" /> Human approval required</div>
              <div className="mt-1 text-white/85">{r.approval}</div>
              <div className="mt-3 flex gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-medium transition ${approved ? 'bg-mint text-ink' : 'bg-white text-ink'}`}>{approved ? 'Approved by Sam ✓' : 'Approve'}</span>
                {!approved && <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">Edit</span>}
              </div>
            </li>
          )}
          {done && (
            <li key={run + 'done'} className="animate-fadeup flex items-center gap-2 rounded-xl bg-mint/15 p-3 text-sm text-mint">
              <Check className="h-4 w-4" /> {r.result}
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}
