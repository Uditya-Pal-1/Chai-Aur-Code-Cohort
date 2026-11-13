import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  UploadCloud,
  Radar,
  Route,
  LayoutDashboard,
  TrendingUp,
  CheckCircle2,
  Circle,
  Lock,
  Star,
} from "lucide-react";

function DashboardMock() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-brand-400/40 via-violet-300/30 to-transparent blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-2xl shadow-ink-900/10">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] font-medium text-ink-400 ring-1 ring-ink-100">
            app.atellixcareer.com/dashboard
          </span>
        </div>

        <div className="grid grid-cols-[52px_1fr]">
          {/* mini sidebar */}
          <div className="flex flex-col items-center gap-3 border-r border-ink-100 bg-ink-50/40 py-4">
            {[LayoutDashboard, Radar, Route, UploadCloud, Star].map((Icon, i) => (
              <span
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  i === 0 ? "bg-brand-600 text-white" : "text-ink-400"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>

          {/* content */}
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-900">Welcome back, Aman</p>
                <p className="text-xs text-ink-500">Week 3 of 6 · Senior Frontend Engineer</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                +12% this week
              </span>
            </div>

            {/* readiness ring */}
            <div className="flex items-center gap-4 rounded-xl border border-ink-100 p-4">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eceef6" strokeWidth="4" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke="url(#grad)" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray="97.4" strokeDashoffset="31"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6a5cf0" />
                      <stop offset="100%" stopColor="#a3a5fb" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">68%</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Role readiness</p>
                <p className="truncate text-xs text-ink-600">4 skills still gap you from Senior Frontend</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-500 to-violet-400" />
                </div>
              </div>
            </div>

            {/* skill bars */}
            <div className="space-y-2.5">
              {[
                { name: "React", v: 82, c: "bg-brand-500" },
                { name: "Next.js", v: 58, c: "bg-amber-400" },
                { name: "System Design", v: 35, c: "bg-rose-400" },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-24 truncate text-[11px] font-medium text-ink-600">{s.name}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                    <div className={`h-full rounded-full ${s.c}`} style={{ width: `${s.v}%` }} />
                  </div>
                  <span className="w-8 text-right text-[11px] font-semibold text-ink-500">{s.v}</span>
                </div>
              ))}
            </div>

            {/* today */}
            <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">Today · Week 3</p>
              <p className="mt-1 text-xs font-medium text-ink-800">System Design for Frontend — caching & state architecture</p>
              <div className="mt-2 flex gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink-600 ring-1 ring-ink-100">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> 2/3 done
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink-600 ring-1 ring-ink-100">
                  <Circle className="h-3 w-3 text-ink-300" /> 1 left · 45m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div className="absolute -left-6 top-24 hidden animate-float rounded-xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur md:block">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-ink-900">Skill gap closed</p>
            <p className="text-[10px] text-ink-500">TypeScript · +14 pts</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-4 bottom-28 hidden animate-float rounded-xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur [animation-delay:1.2s] md:block">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-ink-900">AI insight</p>
            <p className="text-[10px] text-ink-500">Capstone ready to start</p>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-16 hidden items-center gap-1.5 rounded-full border border-ink-100 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-ink-600 shadow-lg backdrop-blur md:flex">
        <Lock className="h-3 w-3 text-ink-400" /> Week 4 unlocks after milestone
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
      {/* backdrop */}
      <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-200/50 via-violet-100/40 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            <Sparkles className="h-4 w-4" />
            AI career navigator · 2026
          </div>

          <h1
            className="animate-fade-up font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Know the gap.
            <br />
            <span className="bg-gradient-to-r from-brand-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Close it week by week.
            </span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Upload your resume, see exactly which skills stand between you and your target role,
            and follow a personalized AI learning path with milestones you can prove to employers.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/app"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition hover:bg-brand-700 sm:w-auto"
            >
              Analyze my resume — free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-8 py-3.5 text-base font-semibold text-ink-800 transition hover:border-ink-300 hover:bg-ink-50 sm:w-auto"
            >
              See how it works
            </a>
          </div>

          <p className="animate-fade-up mt-5 text-sm text-ink-500" style={{ animationDelay: "300ms" }}>
            Free plan · No credit card · Your data stays yours
          </p>
        </div>

        <div className="animate-fade-up mx-auto mt-16 max-w-5xl lg:mt-20" style={{ animationDelay: "360ms" }}>
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
