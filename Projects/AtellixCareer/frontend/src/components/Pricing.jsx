"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
const plans = [
    {
        name: "Free",
        tagline: "Start your gap analysis",
        monthly: 0,
        annual: 0,
        cta: "Start free",
        featured: false,
        features: [
            "1 full role gap analysis",
            "First 3 weeks of learning path",
            "Skill dashboard & progress tracking",
            "Community resource links",
            "Export plan as PDF",
        ],
    },
    {
        name: "Pro",
        tagline: "The complete navigator",
        monthly: 19,
        annual: 15,
        cta: "Go Pro",
        featured: true,
        badge: "Most popular",
        features: [
            "Unlimited role analyses & re-plans",
            "Full 8–12 week personalized paths",
            "Portfolio milestone tracking",
            "Interview-readiness scoring",
            "Priority resource curation",
            "Progress sync across devices",
            "Cancel anytime",
        ],
    },
    {
        name: "Teams",
        tagline: "For bootcamps & employers",
        monthly: 49,
        annual: 39,
        cta: "Talk to us",
        featured: false,
        features: [
            "Everything in Pro, per seat",
            "Cohort dashboards & reporting",
            "Custom role frameworks",
            "SSO & admin controls",
            "Dedicated success manager",
        ],
    },
];
const comparison = [
    { feature: "Role gap analyses", free: "1", pro: "Unlimited", teams: "Unlimited" },
    { feature: "Learning path weeks", free: "3", pro: "Full path", teams: "Full path" },
    { feature: "Portfolio milestones", free: "View", pro: "Track + proof", teams: "Track + proof" },
    { feature: "Interview readiness", free: "—", pro: "Included", teams: "Included" },
    { feature: "Custom role frameworks", free: "—", pro: "—", teams: "Included" },
    { feature: "Support", free: "Community", pro: "Priority", teams: "Dedicated" },
];
export default function Pricing() {
    const [annual, setAnnual] = useState(true);
    return (<section id="pricing" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Pay for progress, not promises
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Start free with a full gap analysis. Upgrade when you want the complete path.
          </p>

          {/* billing toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-ink-200 bg-ink-50 p-1">
            {["Monthly", "Annual"].map((label) => {
            const isAnnual = label === "Annual";
            const active = annual === isAnnual;
            return (<button key={label} onClick={() => setAnnual(isAnnual)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${active ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-800"}`}>
                  {label}
                  {isAnnual && (<span className={`ml-1.5 text-xs font-bold ${active ? "text-emerald-600" : "text-ink-400"}`}>
                      −20%
                    </span>)}
                </button>);
        })}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (<div key={p.name} className={`relative flex flex-col rounded-2xl border p-8 ${p.featured
                ? "border-brand-500 bg-gradient-to-b from-brand-50/80 to-white shadow-2xl shadow-brand-500/15 lg:-my-4 lg:py-12"
                : "border-ink-100 bg-white card-hover"}`}>
              {p.badge && (<span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Sparkles className="h-3.5 w-3.5"/> {p.badge}
                </span>)}
              <h3 className="font-display text-xl font-bold text-ink-950">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-500">{p.tagline}</p>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-5xl font-bold tracking-tight text-ink-950">
                  ${annual ? p.annual : p.monthly}
                </span>
                <span className="pb-1.5 text-sm text-ink-500">/mo</span>
              </div>
              {annual && p.monthly > 0 && (<p className="mt-1 text-xs text-emerald-600 font-medium">billed annually · save ${((p.monthly - p.annual) * 12).toFixed(0)}/yr</p>)}
              {p.monthly === 0 && <p className="mt-1 text-xs text-ink-400">free forever plan</p>}

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-brand-600" : "text-emerald-500"}`}/>
                    {f}
                  </li>))}
              </ul>

              <Link href="/app" className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${p.featured
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700"
                : "border border-ink-200 text-ink-800 hover:border-ink-300 hover:bg-ink-50"}`}>
                {p.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
              </Link>
            </div>))}
        </div>

        {/* comparison table */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h3 className="text-center font-display text-2xl font-bold text-ink-950">Compare plans</h3>
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/70 text-xs uppercase tracking-wide text-ink-500">
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  <th className="px-4 py-4 font-semibold">Free</th>
                  <th className="px-4 py-4 font-semibold text-brand-700">Pro</th>
                  <th className="px-4 py-4 font-semibold">Teams</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (<tr key={row.feature} className="border-b border-ink-50 last:border-0">
                    <td className="px-6 py-3.5 font-medium text-ink-800">{row.feature}</td>
                    <td className="px-4 py-3.5 text-ink-600">{row.free}</td>
                    <td className="px-4 py-3.5 font-semibold text-brand-700">{row.pro}</td>
                    <td className="px-4 py-3.5 text-ink-600">{row.teams}</td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>);
}
