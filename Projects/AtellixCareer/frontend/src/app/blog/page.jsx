import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { CTA, Footer } from "@/components/Sections";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
export const metadata = { title: "Resources — AtellixCareer" };
const posts = [
    {
        tag: "Skill gaps",
        title: "The 5 skills that actually block senior frontend offers in 2026",
        excerpt: "We analyzed 2,400 senior frontend job posts. The gap between 'React developer' and 'senior' isn't more React — it's these five things.",
        read: "8 min",
        date: "Nov 8, 2026",
    },
    {
        tag: "Learning science",
        title: "Why week-by-week plans beat monthly goals (and how to size them)",
        excerpt: "Research on implementation intentions shows small weekly commitments outperform big goals by ~3x. Here's the math behind our path generator.",
        read: "6 min",
        date: "Nov 1, 2026",
    },
    {
        tag: "Portfolio",
        title: "Proof beats credentials: what hiring managers actually click",
        excerpt: "We surveyed 120 engineering managers on portfolio reviews. Live apps and case studies won; certificates didn't even register.",
        read: "10 min",
        date: "Oct 24, 2026",
    },
    {
        tag: "AI & trust",
        title: "How we keep AI career advice honest (and editable)",
        excerpt: "Confidence scores, evidence links, human correction loops — the design choices that keep our assessments advisory instead of oracle.",
        read: "7 min",
        date: "Oct 12, 2026",
    },
    {
        tag: "System design",
        title: "System design for frontend engineers: a 4-week self-study plan",
        excerpt: "Caching, state architecture, API boundaries — the exact module sequence our gap engine prescribes for this skill.",
        read: "9 min",
        date: "Sep 30, 2026",
    },
    {
        tag: "Career change",
        title: "Ops to backend in 6 months: a real gap-analysis breakdown",
        excerpt: "Anonymized walkthrough of a career-changer's assessment — what the data showed, what the plan prioritized, and what changed.",
        read: "12 min",
        date: "Sep 18, 2026",
    },
];
export default function BlogPage() {
    return (<>
      <Navbar />
      <main>
        <section className="pb-14 pt-36">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Resources</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
              Notes from the gap analysis
            </h1>
            <p className="mt-4 text-lg text-ink-600">
              Research, playbooks, and honest postmortems on what actually moves careers forward.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {posts.map((p, i) => (<Reveal key={p.title} delay={(i % 3) * 70}>
                <article className="card-hover group flex h-full cursor-pointer flex-col rounded-2xl border border-ink-100 bg-white p-7">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
                      <Tag className="mr-1 inline h-3 w-3"/>{p.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-ink-400">
                      <Clock className="h-3 w-3"/>{p.read}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-bold leading-snug text-ink-950 transition group-hover:text-brand-700">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{p.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-ink-50 pt-4">
                    <span className="text-xs text-ink-400">{p.date}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-brand-600">
                      Read <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                    </span>
                  </div>
                </article>
              </Reveal>))}
          </div>
        </section>

        {/* newsletter */}
        <section className="pb-24">
          <div className="mx-auto max-w-2xl rounded-3xl border border-ink-100 bg-gradient-to-br from-brand-50 to-violet-50 p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-bold text-ink-950">The Gap Report — monthly</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
              One email a month: which skills are rising in demand, what top candidates are proving,
              and a free mini gap-analysis template. No fluff, unsubscribe anytime.
            </p>
            <NewsletterForm />
            <p className="mt-3 text-[11px] text-ink-400">Join 12,400+ readers · read by engineers at 200+ companies</p>
          </div>
        </section>

        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
    </>);
}
