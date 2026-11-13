import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { CTA, Footer } from "@/components/Sections";
import { FileSearch, Scale, Eye, RefreshCw, Database, GraduationCap } from "lucide-react";

export const metadata = { title: "Methodology — AtellixCareer" };

const principles = [
  {
    icon: FileSearch,
    title: "Evidence over inference",
    body: "Every skill verdict cites what your resume actually shows — projects, titles, technologies named. If we can't see evidence, we say so instead of guessing.",
  },
  {
    icon: Scale,
    title: "Advisory, never decisive",
    body: "Our outputs are planning aids. We do not rank candidates, predict employability, or make hiring recommendations — and the product is designed so no one can mistake it for one.",
  },
  {
    icon: Eye,
    title: "Show the work",
    body: "Every gap shows its confidence score and reasoning. Every plan step links to a resource and a validation milestone you can check off yourself.",
  },
  {
    icon: RefreshCw,
    title: "Plans evolve with you",
    body: "Role frameworks are versioned and reviewed on a schedule. When the market shifts or you correct your profile, your path regenerates — nothing is frozen.",
  },
  {
    icon: Database,
    title: "Data minimization",
    body: "We collect only what's needed to build your plan. You can export or delete everything at any time, and AI providers receive the minimum context required.",
  },
  {
    icon: GraduationCap,
    title: "Proof over credentials",
    body: "Milestones produce artifacts — repos, case studies, deployed apps — that demonstrate skill better than any badge or score ever could.",
  },
];

const pipeline = [
  { step: "Extract", body: "Resume text → structured skills, roles, projects, and seniority signals." },
  { step: "Compare", body: "Evidenced skills vs. role framework proficiency targets, per skill." },
  { step: "Prioritize", body: "Gaps ranked by market frequency and seniority impact — not alphabetically." },
  { step: "Prescribe", body: "Week-sized modules with resources, milestones, and validation checks." },
  { step: "Verify", body: "You complete milestones; mastery updates only when evidence does." },
];

export default function MethodologyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pb-16 pt-36">
          <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Methodology</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
              How the navigator thinks
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Career advice fails when it's a black box. AtellixCareer is built on five commitments —
              the same ones our README holds us to.
            </p>
          </div>
        </section>

        {/* principles grid */}
        <section className="pb-20">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="card-hover h-full rounded-2xl border border-ink-100 bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* pipeline */}
        <section className="bg-ink-950 py-20 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-display text-3xl font-bold">The analysis pipeline</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-ink-300">
              Five deterministic stages. AI assists extraction and phrasing — structure and scoring stay inspectable.
            </p>
            <div className="mt-12 space-y-0">
              {pipeline.map((p, i) => (
                <Reveal key={p.step} delay={i * 80}>
                  <div className="flex gap-5 border-l-2 border-brand-500/40 pb-8 pl-8 last:pb-0">
                    <div>
                      <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold">{p.step}</h3>
                      <p className="mt-1 max-w-lg text-sm text-ink-300">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* evaluation & governance */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Governance</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
                How we keep it honest at scale
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  t: "Framework review cycle",
                  d: "Every role framework is versioned and reviewed quarterly against live job-market data. Changes are logged with sources — you always know which version scored you.",
                },
                {
                  t: "Human correction loop",
                  d: "When users correct extractions or dismiss recommendations, those signals feed framework review. Disagreement is treated as a quality metric, not user error.",
                },
                {
                  t: "Bias & coverage audits",
                  d: "We test role frameworks across seniority levels, company sizes, and domains for coverage gaps and disparate failure patterns before each release.",
                },
              ].map((c) => (
                <Reveal key={c.t}>
                  <div className="h-full rounded-2xl border border-ink-100 bg-white p-7">
                    <h3 className="font-display font-bold text-ink-950">{c.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
    </>
  );
}
