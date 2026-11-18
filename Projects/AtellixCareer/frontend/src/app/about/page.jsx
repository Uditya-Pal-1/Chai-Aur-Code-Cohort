import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { CTA, Footer } from "@/components/Sections";
import { Target, Eye, Hammer, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";
export const metadata = { title: "Our Story — AtellixCareer" };
const timeline = [
    {
        year: "2025 · The question",
        title: "Why does career advice keep failing?",
        body: "We kept seeing the same loop: people bought courses before knowing what to learn, collected certificates that never converted to interviews, and got 'build more projects' advice with zero specifics. Meanwhile the raw material for better advice — resumes, job descriptions, role frameworks — was already digital. It just wasn't connected.",
    },
    {
        year: "2025 · The insight",
        title: "The gap is a data problem, not a motivation problem",
        body: "Every senior role has a knowable skill profile. Every resume contains evidence of what someone can actually do. The missing piece was a system that compares the two honestly — and shows its work instead of hiding behind a score.",
    },
    {
        year: "2026 · What we delivered",
        title: "An explainable career navigator",
        body: "AtellixCareer ships three things no generic course platform does: (1) gap analysis where every verdict cites evidence and confidence, (2) week-by-week paths sized to your real hours with checkable milestones, and (3) a portfolio of proof — repos, case studies, live apps — that interviews can verify.",
    },
];
const values = [
    { icon: Eye, title: "Show the work", body: "If a recommendation can't show its evidence, it doesn't ship. Confidence scores and reasoning are visible on every output." },
    { icon: Hammer, title: "Proof over credentials", body: "Certificates are claims. Deployed apps and case studies are evidence. We optimize for the latter." },
    { icon: ShieldCheck, title: "Advisory, never decisive", body: "We map skills — we don't judge people. No employability predictions, no candidate ranking, no hiring recommendations." },
    { icon: HeartHandshake, title: "You stay in control", body: "Every plan is editable. Every skill rating can be corrected. The tool serves your goals, not its own metrics." },
];
export default function AboutPage() {
    return (<>
      <Navbar />
      <main>
        {/* hero */}
        <section className="relative overflow-hidden pb-20 pt-36">
          <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"/>
          <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-200/50 to-transparent blur-3xl"/>
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              <Target className="h-4 w-4"/> Our story
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink-950 sm:text-6xl">
              Career advice should show its work.
              <span className="block bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                Ours does.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
              AtellixCareer is an AI career navigator that turns "figure out what to learn" into a concrete,
              evidence-backed plan — and turns learning into proof employers can verify.
            </p>
          </div>
        </section>

        {/* mission */}
        <section className="pb-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <blockquote className="rounded-3xl border border-ink-100 bg-ink-50/60 p-8 sm:p-10">
                <p className="font-display text-xl font-semibold leading-relaxed text-ink-900 sm:text-2xl">
                  "Most career tools answer 'what should I learn?' with a course catalog.
                  We answer it with evidence: here's what your resume proves, here's what the role demands,
                  here's the shortest honest path between them — and here's how you'll prove it worked."
                </p>
                <footer className="mt-5 text-sm font-medium text-ink-500">— The AtellixCareer team</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* timeline */}
        <section className="bg-ink-950 py-20 text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-display text-3xl font-bold">How we got here</h2>
            <div className="mt-12 space-y-0">
              {timeline.map((t, i) => (<Reveal key={t.year} delay={i * 100}>
                  <div className="relative border-l-2 border-brand-500/40 pb-10 pl-8 last:pb-0">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-brand-400 bg-ink-950"/>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-300">{t.year}</p>
                    <h3 className="mt-2 font-display text-xl font-bold">{t.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">{t.body}</p>
                  </div>
                </Reveal>))}
            </div>
          </div>
        </section>

        {/* values */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">What we believe</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
                Principles that shape every feature
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (<Reveal key={v.title} delay={i * 70}>
                  <div className="card-hover h-full rounded-2xl border border-ink-100 bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <v.icon className="h-5 w-5"/>
                    </span>
                    <h3 className="mt-4 font-display font-bold text-ink-950">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.body}</p>
                  </div>
                </Reveal>))}
            </div>
          </div>
        </section>

        {/* what we delivered */}
        <section className="bg-ink-50/60 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">What we delivered</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950">
                Three products in one
              </h2>
              <ul className="mt-6 space-y-4">
                {[
            ["The Mirror", "An honest read of where you stand — skills, gaps, and confidence — before you spend a dollar or an hour."],
            ["The Path", "A week-by-week plan sized to your schedule, with resources, milestones, and a checkable progression."],
            ["The Proof", "A portfolio of artifacts — live apps, repos, case studies — that turns learning into evidence."],
        ].map(([name, desc]) => (<li key={name} className="flex gap-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500"/>
                    <div>
                      <p className="font-display font-bold text-ink-950">{name}</p>
                      <p className="mt-0.5 text-sm text-ink-600">{desc}</p>
                    </div>
                  </li>))}
              </ul>
              <Link href="/onboarding" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700">
                Try it yourself <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
              </Link>
            </div>
            <div className="grid gap-4">
              {[
            { k: "Explainable", v: "Every verdict shows evidence + confidence" },
            { k: "Editable", v: "Every plan is yours to change" },
            { k: "Private", v: "Export or delete everything, anytime" },
            { k: "Honest", v: "Planning aid — never an employability verdict" },
        ].map((c) => (<div key={c.k} className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-6 py-4">
                  <span className="font-display font-bold text-ink-950">{c.k}</span>
                  <span className="text-sm text-ink-500">{c.v}</span>
                </div>))}
            </div>
          </div>
        </section>

        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
    </>);
}
