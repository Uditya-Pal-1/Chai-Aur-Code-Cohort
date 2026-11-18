import Link from "next/link";
import { UploadCloud, Radar, Route, LayoutDashboard, ShieldCheck, PencilLine, Eye, Quote, ArrowRight, Github, Twitter, Linkedin, HeartHandshake, LineChart, Users, BookOpenCheck, FileSearch, } from "lucide-react";
import { roles, testimonials, skills } from "@/lib/data";
import { BentoGrid, BentoCard } from "@/components/ui/aceternity";
import Logo from "@/components/Logo";
export function LogoStrip() {
    const names = ["NORTHWIND", "Helio Labs", "Quantica", "Bluepeak", "Meridian", "Kairo", "Vertexa", "Polaris"];
    return (<section className="border-y border-ink-100 bg-ink-50/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
          Role frameworks modeled on requirements from teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {names.map((n) => (<span key={n} className="font-display text-lg font-bold tracking-tight text-ink-300 transition hover:text-ink-500">
              {n}
            </span>))}
        </div>
      </div>
    </section>);
}
export function Story() {
    return (<section className="relative overflow-hidden py-24 sm:py-32">
      <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_80%_50%,black,transparent)]"/>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Our story</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Built because career advice kept failing the people it claimed to help
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-600">
            <p>
              <b className="text-ink-900">AtellixCareer started with a frustrating pattern.</b> Job seekers
              were paying for courses before knowing what to learn, collecting certificates that never
              translated into interviews, and getting "you should learn more" advice with zero specifics.
            </p>
            <p>
              Meanwhile, the data to do better already existed — in resumes, job descriptions, and skill
              frameworks. The missing piece was a system that could <i>show its work</i>: exactly which
              skills a role demands, exactly what your experience proves, and exactly what to do next,
              week by week.
            </p>
            <p>
              So we built the navigator we wished existed. Upload a resume, pick a role, and get an
              explainable gap analysis — every verdict backed by evidence, every recommendation editable,
              every milestone designed to produce proof you can show an employer.
            </p>
          </div>
          <Link href="/about" className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700">
            Read the full story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
          </Link>
        </div>

        {/* story visual */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-200/40 to-fuchsia-200/30 blur-2xl"/>
          <div className="relative space-y-4">
            {[
            { icon: FileSearch, t: "The problem", d: "Generic advice, black-box scores, courses sold before gaps were known." },
            { icon: Radar, t: "The insight", d: "Resumes + role frameworks already contain the answer — if you can show the work." },
            { icon: Route, t: "What we delivered", d: "Explainable gap analysis → personalized weekly paths → proof-point portfolio." },
        ].map((s, i) => (<div key={s.t} className="card-hover flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
                  <s.icon className="h-5 w-5"/>
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-ink-950">
                    <span className="mr-2 text-brand-500">0{i + 1}</span>{s.t}
                  </p>
                  <p className="mt-1 text-sm text-ink-600">{s.d}</p>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </section>);
}
export function StatsBand() {
    const stats = [
        { icon: Users, value: "48,000+", label: "careers mapped" },
        { icon: LineChart, value: "120+", label: "role frameworks" },
        { icon: BookOpenCheck, value: "1.2M", label: "learning hours logged" },
        { icon: HeartHandshake, value: "94%", label: "plan completion rate" },
    ];
    return (<section className="border-y border-ink-100 bg-white py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (<div key={s.label} className="text-center">
            <s.icon className="mx-auto h-5 w-5 text-brand-500"/>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-950">{s.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-400">{s.label}</p>
          </div>))}
      </div>
    </section>);
}
export function HowItWorks() {
    const steps = [
        {
            icon: UploadCloud,
            step: "01",
            title: "Upload your resume",
            body: "Drag in your PDF or LinkedIn export. We extract skills, projects, and experience — and show you exactly what we found before anything is scored.",
        },
        {
            icon: Radar,
            step: "02",
            title: "Map the gap",
            body: "Pick a target role. See a skill-by-skill heatmap of what you already prove vs. what the role demands — with evidence and confidence for every line.",
        },
        {
            icon: Route,
            step: "03",
            title: "Follow your path",
            body: "Get a week-by-week plan of courses, projects, and milestones sized to your hours. Your dashboard tracks mastery as you prove each skill.",
        },
    ];
    return (<section id="how-it-works" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            From resume to roadmap in three steps
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            No black-box scores. Every recommendation shows its evidence, and you can edit anything.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent md:block"/>
          {steps.map((s) => (<div key={s.step} className="card-hover relative rounded-2xl border border-ink-100 bg-white p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30">
                  <s.icon className="h-6 w-6"/>
                </span>
                <span className="font-display text-4xl font-bold text-ink-100">{s.step}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-ink-950">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{s.body}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
export function Features() {
    const topGaps = [...skills].filter((s) => s.status === "gap").slice(0, 3);
    return (<section id="features" className="scroll-mt-20 bg-ink-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Features</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            A career copilot that shows its work
          </h2>
        </div>

        <BentoGrid className="mt-14">
          <BentoCard name="Explainable gap analysis" description="Every skill verdict links to resume evidence, role requirements, and a confidence level. Correct anything we got wrong." icon={<Radar className="h-5 w-5"/>} className="md:col-span-2" visual={<div className="space-y-2 rounded-xl bg-ink-50/70 p-3 ring-1 ring-ink-100">
                {topGaps.map((s) => (<div key={s.name} className="flex items-center gap-2">
                    <span className="w-28 truncate text-[11px] font-medium text-ink-700">{s.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-rose-400" style={{ width: `${s.current}%` }}/>
                    </div>
                    <span className="text-[10px] font-bold text-ink-500">{s.current}→{s.target}</span>
                  </div>))}
              </div>}/>
          <BentoCard name="Private by design" description="Minimal data collection, encrypted storage, export and deletion on demand." icon={<ShieldCheck className="h-5 w-5"/>}/>
          <BentoCard name="Week-by-week learning paths" description="Personalized modules with courses, projects, and validation milestones — regenerated whenever your goals change." icon={<Route className="h-5 w-5"/>}/>
          <BentoCard name="Real-time mastery dashboard" description="Track skill scores, streaks, and portfolio milestones in one view." icon={<LayoutDashboard className="h-5 w-5"/>}/>
          <BentoCard name="Editable plans, always" description="Swap resources, adjust hours, dismiss milestones. The plan works for you." icon={<PencilLine className="h-5 w-5"/>}/>
          <BentoCard name="Portfolio proof points" description="Each milestone produces shareable evidence — repos, case studies, live apps." icon={<Eye className="h-5 w-5"/>}/>
        </BentoGrid>
      </div>
    </section>);
}
export function Roles() {
    return (<section id="roles" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Role catalogue</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              120+ technical roles, versioned frameworks
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Each role defines the skills, proficiency expectations, and seniority signals we map against — sourced and reviewed, not scraped.
            </p>
          </div>
          <Link href="/app/analysis" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-800 transition hover:border-brand-300 hover:text-brand-700">
            Pick your role
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-ink-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50/70 text-xs uppercase tracking-wide text-ink-500">
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="hidden px-6 py-4 font-semibold sm:table-cell">Salary band (US)</th>
                <th className="hidden px-6 py-4 font-semibold md:table-cell">Open roles</th>
                <th className="px-6 py-4 font-semibold">Demand</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (<tr key={r.title} className="border-b border-ink-50 transition hover:bg-brand-50/40">
                  <td className="px-6 py-4 font-semibold text-ink-900">{r.title}</td>
                  <td className="hidden px-6 py-4 text-ink-600 sm:table-cell">{r.avgSalary}</td>
                  <td className="hidden px-6 py-4 text-ink-600 md:table-cell">{r.openings}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      {r.growth}
                    </span>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </section>);
}
export function Testimonials() {
    return (<section className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">Outcomes</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            People closed their gaps. Here is what changed.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (<figure key={t.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <Quote className="h-6 w-6 text-brand-300"/>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-100">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-sm font-bold`}>
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.role}</p>
                </div>
              </figcaption>
            </figure>))}
        </div>
      </div>
    </section>);
}
export function CTA() {
    return (<section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 px-8 py-16 text-center sm:px-16">
          <div className="dot-grid absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)]"/>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your next role is a gap analysis away
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              Upload a resume, pick a target role, and get your first skill-gap report in under two minutes.
            </p>
            <Link href="/app" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-xl transition hover:bg-brand-50">
              Start free — no card required
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
            </Link>
          </div>
        </div>
      </div>
    </section>);
}
export function Footer() {
    const cols = [
        { title: "Product", links: [["How it works", "/#how-it-works"], ["Features", "/#features"], ["Roles", "/#roles"], ["Pricing", "/pricing"], ["FAQ", "/#faq"]] },
        { title: "Resources", links: [["Blog", "/blog"], ["About", "/about"], ["Methodology", "/methodology"], ["Login", "/login"], ["Get started", "/onboarding"]] },
        { title: "Company", links: [["Our story", "/about"], ["Methodology", "/methodology"], ["Contact", "mailto:hello@atellixcareer.com"], ["Privacy", "/methodology"], ["Terms", "/methodology"]] },
    ];
    return (<footer className="border-t border-ink-100 bg-ink-50/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              The AI career navigator that maps skill gaps to week-by-week plans — with evidence, not guesses.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (<a key={i} href={`mailto:hello@atellixcareer.com?subject=Follow%20AtellixCareer`} title="Contact us" className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 transition hover:border-brand-300 hover:text-brand-600">
                  <Icon className="h-4 w-4"/>
                </a>))}
            </div>
          </div>
          {cols.map((c) => (<div key={c.title}>
              <p className="text-sm font-semibold text-ink-900">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([l, href]) => (<li key={l}>
                    <Link href={href} className="text-sm text-ink-500 transition hover:text-brand-600">
                      {l}
                    </Link>
                  </li>))}
              </ul>
            </div>))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-8 text-sm text-ink-400 sm:flex-row">
          <p>© 2026 AtellixCareer. Skill assessments are planning aids, not employability predictions.</p>
          <p>Built for career changers, students & professionals.</p>
        </div>
      </div>
    </footer>);
}
