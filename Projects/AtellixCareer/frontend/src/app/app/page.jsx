import Link from "next/link";
import { Target, Flame, CalendarCheck, FolderGit2, ArrowRight, TrendingUp, Clock, Sparkles, } from "lucide-react";
import { skills, learningPath, portfolioMilestones, targetRole, activityFeed } from "@/lib/data";
import { SkillRadar, ActivityHeatmap, StatusDonut } from "@/components/charts";
import Counter from "@/components/Counter";
const statusStyles = {
    strong: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    developing: "bg-amber-50 text-amber-700 ring-amber-200",
    gap: "bg-rose-50 text-rose-700 ring-rose-200",
};
const statusLabel = {
    strong: "Strong",
    developing: "Developing",
    gap: "Gap",
};
export default function DashboardPage() {
    const currentWeek = learningPath.find((w) => w.status === "current");
    const doneWeeks = learningPath.filter((w) => w.status === "done").length;
    const avgMastery = Math.round(skills.reduce((a, s) => a + s.current, 0) / skills.length);
    const readiness = targetRole.matchScore;
    const milestonesDone = portfolioMilestones.filter((m) => m.status === "done").length;
    const resDonePct = 62;
    return (<div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-500">
            Week {currentWeek.week} of {learningPath.length} · targeting{" "}
            <span className="font-semibold text-ink-800">{targetRole.title}</span>
          </p>
        </div>
        <Link href="/app/analysis" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800">
          New analysis <ArrowRight className="h-4 w-4"/>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
            { label: "Role readiness", value: readiness, suffix: "%", icon: Target, tone: "text-brand-600 bg-brand-50", sub: "+6 pts this week" },
            { label: "Avg skill mastery", value: avgMastery, suffix: "%", icon: TrendingUp, tone: "text-emerald-600 bg-emerald-50", sub: "across 12 tracked skills" },
            { label: "Learning streak", value: 12, suffix: " days", icon: Flame, tone: "text-amber-600 bg-amber-50", sub: "personal best: 21" },
            { label: "Milestones done", value: milestonesDone, suffix: `/${portfolioMilestones.length}`, icon: FolderGit2, tone: "text-violet-600 bg-violet-50", sub: "portfolio proof points" },
        ].map((s, i) => (<div key={s.label} className="card-hover rounded-2xl border border-ink-100 bg-white p-5" style={{ animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both` }}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink-500">{s.label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone}`}>
                <s.icon className="h-4.5 w-4.5"/>
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950">
              <Counter to={s.value} suffix={s.suffix}/>
            </p>
            <p className="mt-1 text-xs text-ink-400">{s.sub}</p>
          </div>))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Weekly goal + today's focus */}
        <div className="space-y-6">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink-950">Weekly goal</h2>
            <span className="text-xs font-semibold text-ink-400">Week {currentWeek.week} of {learningPath.length}</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-ink-500">
              <span>Complete {currentWeek.theme}</span>
              <span className="font-bold text-ink-900">{resDonePct}%</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-1000" style={{ width: `${resDonePct}%` }}/>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {currentWeek.milestones.map((m, i) => (<span key={m} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ring-1 ${i === 0 ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-ink-50 text-ink-600 ring-ink-100"}`}>
                  {i === 0 ? "✓" : "○"} {m}
                </span>))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink-950">Today's focus</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              <CalendarCheck className="h-3.5 w-3.5"/> Week {currentWeek.week}
            </span>
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{currentWeek.theme}</h3>
          <p className="mt-1 text-sm text-ink-500">{currentWeek.focus}</p>

          <div className="mt-5 space-y-3">
            {currentWeek.resources.map((r, i) => (<div key={r.title} className="group flex items-center justify-between gap-3 rounded-xl border border-ink-100 px-4 py-3 transition hover:border-brand-200 hover:bg-brand-50/40" style={{ animation: `fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${200 + i * 80}ms both` }}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-[10px] font-bold uppercase text-ink-500 ring-1 ring-ink-100">
                    {r.type.slice(0, 3)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink-800">{r.title}</p>
                    <p className="text-xs text-ink-400">{r.type}</p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-ink-500">
                  <Clock className="h-3.5 w-3.5"/> {r.duration}
                </span>
              </div>))}
          </div>

          <div className="mt-5 rounded-xl bg-gradient-to-r from-brand-50 to-violet-50 p-4 ring-1 ring-brand-100">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <Sparkles className="h-3.5 w-3.5"/> AI coach note
            </p>
            <p className="mt-1.5 text-sm text-ink-600">
              You're 82% through Next.js App Router. Finish this week's design exercise, then your
              readiness jumps ~6 points — System Design is the biggest remaining gap.
            </p>
          </div>
        </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Recent activity */}
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink-950">Recent activity</h2>
            <ul className="mt-4 space-y-3.5">
              {activityFeed.map((a, i) => (<li key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${a.icon === "check" ? "bg-emerald-100 text-emerald-600" :
                a.icon === "star" ? "bg-amber-100 text-amber-600" :
                    a.icon === "upload" ? "bg-brand-100 text-brand-600" :
                        a.icon === "flag" ? "bg-violet-100 text-violet-600" :
                            a.icon === "users" ? "bg-sky-100 text-sky-600" : "bg-ink-100 text-ink-500"}`}>
                    {a.icon === "check" ? "✓" : a.icon === "star" ? "★" : a.icon === "upload" ? "↑" : a.icon === "flag" ? "⚑" : a.icon === "users" ? "👥" : "≡"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium leading-snug text-ink-800">{a.text}</p>
                    <p className="text-[11px] text-ink-400">{a.time}</p>
                  </div>
                </li>))}
            </ul>
          </div>

          {/* Skill map radar */}
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink-950">Skill map</h2>
              <Link href="/app/analysis" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                Details →
              </Link>
            </div>
            <div className="mt-2">
              <SkillRadar />
            </div>
            <div className="mt-2 flex items-center justify-center gap-5 text-[11px] text-ink-500">
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded bg-brand-600"/> You
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded bg-brand-300 [background:repeating-linear-gradient(90deg,#a3a5fb_0_4px,transparent_4px_7px)]"/> Target
              </span>
            </div>
          </div>

          {/* Path progress */}
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink-950">Path progress</h2>
              <Link href="/app/path" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                View path →
              </Link>
            </div>
            <div className="mt-4 space-y-2.5">
              {learningPath.map((w) => (<div key={w.week} className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${w.status === "done"
                ? "bg-emerald-500 text-white"
                : w.status === "current"
                    ? "bg-brand-600 text-white ring-4 ring-brand-100"
                    : "bg-ink-100 text-ink-400"}`}>
                    {w.status === "done" ? "✓" : w.week}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-medium ${w.status === "upcoming" ? "text-ink-400" : "text-ink-800"}`}>
                      {w.theme}
                    </p>
                  </div>
                  {w.status === "current" && (<span className="text-[10px] font-bold uppercase tracking-wide text-brand-600">Now</span>)}
                </div>))}
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs font-medium text-ink-500">
                <span>{doneWeeks} of {learningPath.length} weeks complete</span>
                <span>{Math.round((doneWeeks / learningPath.length) * 100)}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-1000" style={{ width: `${(doneWeeks / learningPath.length) * 100}%` }}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Activity heatmap */}
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink-950">Consistency</h2>
              <p className="mt-0.5 text-xs text-ink-500">Focused minutes per day, last 18 weeks</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
              <Flame className="h-3.5 w-3.5"/> 12-day streak
            </span>
          </div>
          <div className="mt-5">
            <ActivityHeatmap />
          </div>
        </div>

        {/* Status distribution + top gaps */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink-950">Skill status</h2>
            <div className="mt-4">
              <StatusDonut />
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink-950">Largest gaps</h2>
              <Link href="/app/analysis" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                Full →
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {skills
            .filter((s) => s.status === "gap")
            .slice(0, 4)
            .map((s) => (<div key={s.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink-800">{s.name}</span>
                      <span className="text-ink-400">
                        {s.current} → <span className="font-semibold text-ink-700">{s.target}</span>
                      </span>
                    </div>
                    <div className="mt-1 flex h-1.5 gap-0.5">
                      <div className="rounded-full bg-rose-300" style={{ width: `${s.current}%` }}/>
                      <div className="flex-1 rounded-full bg-ink-100"/>
                    </div>
                  </div>))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Object.entries(statusLabel).map(([k, v]) => (<span key={k} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${statusStyles[k]}`}>
                  {v}
                </span>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
