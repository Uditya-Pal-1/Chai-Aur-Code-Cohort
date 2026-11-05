import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Star, Lock, Eye, SlidersHorizontal, Mail, MessageSquare, Phone, Hash, Search, PenTool, Hammer, Rocket } from 'lucide-react'
import AgentConsole from '../components/AgentConsole'
import LogoMarquee from '../components/LogoMarquee'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import PricingCards from '../components/PricingCards'
import Faq from '../components/Faq'
import CtaBand from '../components/CtaBand'
import { caseStudies, departments, faqs, integrations, testimonials } from '../data'

function Hero() {
  const [email, setEmail] = useState('')
  const nav = useNavigate()
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-gradient-brand opacity-25 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <Link to="/#results" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink-2 hover:border-ink">
            <span className="flex">{[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-coral text-coral" />)}</span>
            40+ agents shipped to production
          </Link>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            AI agents that actually <span className="font-serif font-normal italic text-gradient pr-1">get work done.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
            Agentico designs, builds and runs custom AI agents for sales, support and operations, so your team can focus on the work only humans can do.
          </p>
          <form className="mt-8 flex max-w-lg flex-col gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm sm:flex-row sm:rounded-full"
            onSubmit={e => { e.preventDefault(); nav(`/book?email=${encodeURIComponent(email)}`) }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Work email" aria-label="Work email" className="flex-1 bg-transparent px-4 py-2 outline-none" />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-medium text-white hover:bg-ink-2">Book a free audit <ArrowRight className="h-4 w-4" /></button>
          </form>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {['Free AI audit', 'First agent live in 21 days', 'You own everything'].map(t => <li key={t} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-mint" />{t}</li>)}
          </ul>
        </div>
        <div className="animate-floaty"><AgentConsole /></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-16">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-muted">Trusted by operators at fast-growing companies</p>
        <LogoMarquee />
      </div>
    </section>
  )
}

function Problem() {
  const items = [
    { stat: '74%', text: 'of companies struggle to get value from AI beyond pilots.' },
    { stat: '6 mo', text: 'is the average time an internal AI project spends “in evaluation”.' },
    { stat: '1 in 3', text: 'AI tools bought last year are no longer used weekly.' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">You bought the AI tools. <span className="text-muted">The pilots stalled. Nobody can show the ROI.</span></h2>
          <p className="text-lg text-muted">You’re not behind, you’re stuck where everyone gets stuck: between a chatbot demo and a system that reliably does the job. Agentico closes that gap with agents built around your workflows, measured by outcomes and supervised by your team.</p>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.stat} delay={i * 100}>
            <div className="h-full rounded-3xl border border-line bg-white p-7">
              <div className="font-serif text-6xl">{it.stat}</div>
              <p className="mt-3 text-muted">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Agents() {
  const [active, setActive] = useState(departments[0].id)
  const dep = departments.find(d => d.id === active)!
  return (
    <section id="agents" className="scroll-mt-20 border-y border-line bg-paper-2/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Agent library" title={<>An AI teammate for <span className="font-serif font-normal italic">every department.</span></>} sub="Start from battle-tested blueprints, then we tailor each agent to your data, tools and rules." />
        <div className="mt-10 flex justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-white p-1" role="tablist">
            {departments.map(d => (
              <button key={d.id} role="tab" aria-selected={active === d.id} onClick={() => setActive(d.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${active === d.id ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>
                <d.icon className="h-4 w-4" />{d.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-muted">{dep.blurb}</p>
        <div key={dep.id} className="mt-10 grid gap-5 md:grid-cols-3">
          {dep.agents.map((a, i) => (
            <div key={a.name} className="animate-fadeup flex flex-col rounded-3xl border border-line bg-white p-6" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{a.name}</h3>
                <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[11px] font-medium text-mint">Ready</span>
              </div>
              <p className="mt-2 text-sm text-muted">{a.desc}</p>
              <div className="mt-5 space-y-2 rounded-2xl bg-paper p-4">
                {a.steps.map((s, j) => (
                  <div key={s} className="flex items-center gap-3 text-sm">
                    <span className={`grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] ${j === a.steps.length - 1 ? 'bg-mint text-white' : 'bg-white border border-line text-muted'}`}>{j === a.steps.length - 1 ? '✓' : j + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-baseline gap-2 pt-5">
                <span className="text-2xl font-semibold tracking-tight">{a.stat}</span>
                <span className="text-sm text-muted">{a.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/book" className="inline-flex items-center gap-2 font-medium hover:underline">Don’t see your workflow? We build custom agents <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { icon: Search, week: 'Week 0', title: 'Discover', text: 'Free audit. We map your workflows and rank automation opportunities by ROI and risk.' },
    { icon: PenTool, week: 'Week 1', title: 'Design', text: 'We define the agent’s job, tools, guardrails and success metrics with your team.' },
    { icon: Hammer, week: 'Weeks 2–3', title: 'Build & evaluate', text: 'We build, connect your systems and test against hundreds of real scenarios before launch.' },
    { icon: Rocket, week: 'Week 3+', title: 'Launch & optimise', text: 'Supervised rollout, live dashboards and monthly improvement sprints. Autonomy grows as trust does.' },
  ]
  return (
    <section id="process" className="scroll-mt-20 bg-ink py-24 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading dark eyebrow="How we work" title={<>From idea to production agent <span className="whitespace-nowrap font-serif font-normal italic text-gradient">in 21 days.</span></>} sub="A fixed, transparent process. Weekly demos, no black boxes." />
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-accent via-[#b06cff] to-coral md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative">
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-[#1b1b24]"><s.icon className="h-5 w-5" /></span>
                <div className="mt-6 font-mono text-xs uppercase tracking-widest text-coral">{s.week}</div>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-white/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Autonomy />
      </div>
    </section>
  )
}

function Autonomy() {
  const levels = [
    { l: 'L1', name: 'Assist', text: 'The agent drafts, you send. Great for week one: every output is reviewed by a human.', you: 'You review everything' },
    { l: 'L2', name: 'Copilot', text: 'The agent handles routine cases and asks for approval on anything sensitive (refunds, payments, outbound).', you: 'You approve key actions' },
    { l: 'L3', name: 'Autopilot', text: 'The agent runs the workflow end-to-end inside guardrails and escalates edge cases with full context.', you: 'You handle exceptions' },
    { l: 'L4', name: 'Self-improving', text: 'The agent learns from outcomes, proposes playbook changes and runs A/B tests. You set strategy.', you: 'You set goals' },
  ]
  const [i, setI] = useState(1)
  return (
    <div className="mt-20 rounded-[2rem] border border-white/10 bg-[#15151c] p-6 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">The autonomy ladder</span>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight">You stay in control. <span className="text-white/50">Turn up autonomy only when the numbers say so.</span></h3>
          <p className="mt-4 text-white/60">Every Agentico agent ships with human-in-the-loop controls, audit logs and a kill switch. Move up a level when accuracy targets are hit, never before.</p>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-2">
            {levels.map((lv, j) => (
              <button key={lv.l} onClick={() => setI(j)} className={`rounded-2xl border p-3 text-left transition ${i === j ? 'border-transparent bg-gradient-brand' : 'border-white/10 hover:border-white/30'}`}>
                <div className="font-mono text-xs text-white/70">{lv.l}</div>
                <div className="mt-1 text-sm font-semibold">{lv.name}</div>
              </button>
            ))}
          </div>
          <div key={i} className="animate-fadeup mt-4 rounded-2xl bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{levels[i].l} · {levels[i].name}</h4>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{levels[i].you}</span>
            </div>
            <p className="mt-3 text-white/70">{levels[i].text}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-brand transition-all duration-500" style={{ width: `${(i + 1) * 25}%` }} /></div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/40"><span>Human-led</span><span>Agent-led</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Results() {
  return (
    <section id="results" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {[['40+', 'agents in production'], ['2.1M', 'tasks completed / month'], ['97.8%', 'average task accuracy'], ['6 wks', 'median payback period']].map(([n, l]) => (
            <div key={l} className="bg-white p-8">
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">{n}</div>
              <div className="mt-2 text-muted">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Customer results" title={<>Measured in outcomes, <span className="font-serif font-normal italic">not demos.</span></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((c, i) => (
              <Reveal key={c.company} delay={i * 80}>
                <div className={`flex h-72 flex-col justify-between rounded-3xl p-6 ${c.tone}`}>
                  <span className="text-sm font-semibold opacity-80">{c.company}</span>
                  <div>
                    <div className="text-6xl font-semibold tracking-tight">{c.metric}</div>
                    <div className="mt-1 font-medium">{c.label}</div>
                    <div className="mt-3 text-sm opacity-70">{c.note}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map(t => (
            <figure key={t.name} className="mb-5 break-inside-avoid rounded-3xl border border-line bg-white p-6">
              <div className="flex">{[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-4 w-4 fill-coral text-coral" />)}</div>
              <blockquote className="mt-4 text-[17px] leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-white">{t.name.split(' ').map(n => n[0]).join('')}</span>
                <span><span className="block text-sm font-semibold">{t.name}</span><span className="block text-xs text-muted">{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Integrations() {
  const channels = [
    { icon: MessageSquare, label: 'Web chat' }, { icon: Mail, label: 'Email' }, { icon: Phone, label: 'Voice' }, { icon: Hash, label: 'Slack & Teams' },
  ]
  return (
    <section className="border-y border-line bg-paper-2/60 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading center={false} eyebrow="Works where you work" title={<>Plugs into your stack. <span className="font-serif font-normal italic">No rip-and-replace.</span></>} sub="Agents read and write in the tools your team already uses, across every channel your customers are on. Model-agnostic: we choose the best model for each task." />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {channels.map(c => (
              <div key={c.label} className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-4 text-sm"><c.icon className="h-5 w-5 text-accent" />{c.label}</div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
          {integrations.map((n, i) => (
            <Reveal key={n} delay={(i % 6) * 50}>
              <div className="flex h-20 items-center justify-center rounded-2xl border border-line bg-white text-sm font-semibold text-ink-2 transition hover:-translate-y-0.5 hover:shadow-md">{n}</div>
            </Reveal>
          ))}
          <div className="flex h-20 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white">+400 more</div>
        </div>
      </div>
    </section>
  )
}

function Trust() {
  const cols = [
    { icon: Lock, title: 'Private by default', points: ['Never used to train models', 'Encrypted in transit & at rest', 'EU / US data residency'] },
    { icon: Eye, title: 'Fully observable', points: ['Every action logged & replayable', 'Live accuracy dashboards', 'Weekly QA reports'] },
    { icon: SlidersHorizontal, title: 'Always in your control', points: ['Approvals for sensitive actions', 'Role-based permissions', 'One-click kill switch'] },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading eyebrow="Security & trust" title={<>Enterprise-grade by design.</>} sub="Built to the standards your security team expects, from day one." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cols.map(c => (
          <div key={c.title} className="rounded-3xl border border-line bg-white p-7">
            <c.icon className="h-6 w-6 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-muted">{c.points.map(p => <li key={p} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />{p}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {['SOC 2 Type II', 'GDPR', 'HIPAA', 'ISO 27001', 'CCPA'].map(b => <span key={b} className="rounded-full border border-line bg-white px-4 py-2 font-mono text-xs tracking-wider text-ink-2">{b}</span>)}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Agents />
      <Process />
      <Results />
      <Integrations />
      <Trust />
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHeading eyebrow="Pricing" title={<>Simple packages. <span className="font-serif font-normal italic">Serious ROI.</span></>} sub="Fixed-fee pilots, managed plans, or pay only per outcome." />
        <div className="mt-12"><PricingCards /></div>
        <div className="mt-8 text-center"><Link to="/pricing" className="inline-flex items-center gap-2 font-medium hover:underline">Compare plans & calculate your ROI <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
      <section id="faq" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading center={false} eyebrow="FAQ" title="Questions, answered." sub="Can’t find what you need? Ask our AI agent in the corner, or book a call." />
        </div>
        <Faq items={faqs} />
      </section>
      <CtaBand />
    </>
  )
}
