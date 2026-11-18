"use client";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Loader2, CheckCircle2, Radar, ChevronRight, AlertTriangle, ShieldCheck, Search, ArrowUpDown, CircleCheck, } from "lucide-react";
import { skills, targetRole, pastAnalyses } from "@/lib/data";
const steps = [
    "Parsing resume text",
    "Extracting skills & projects",
    "Matching against role framework",
    "Scoring gaps with confidence",
];
const statusStyles = {
    strong: { bar: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200", label: "Strong", dot: "bg-emerald-500" },
    developing: { bar: "bg-amber-400", chip: "bg-amber-50 text-amber-700 ring-amber-200", label: "Developing", dot: "bg-amber-400" },
    gap: { bar: "bg-rose-400", chip: "bg-rose-50 text-rose-700 ring-rose-200", label: "Gap", dot: "bg-rose-400" },
};
// deterministic pseudo-confidence so UI feels real
const confidenceOf = (name) => {
    let h = 0;
    for (const c of name)
        h = (h * 31 + c.charCodeAt(0)) % 100;
    return 55 + (h % 40);
};
export default function AnalysisPage() {
    const router = useRouter();
    const [correcting, setCorrecting] = useState(false);
    const [stage, setStage] = useState("idle");
    const [stepIdx, setStepIdx] = useState(0);
    const [fileName, setFileName] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("priority");
    const [query, setQuery] = useState("");
    const runAnalysis = useCallback((name) => {
        setFileName(name);
        setStage("processing");
        setStepIdx(0);
        steps.forEach((_, i) => setTimeout(() => setStepIdx(i + 1), 900 * (i + 1)));
        setTimeout(() => setStage("results"), 900 * (steps.length + 1) + 400);
    }, []);
    const onDrop = (e) => {
        var _a;
        e.preventDefault();
        setDragging(false);
        const f = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (f)
            runAnalysis(f.name);
    };
    const visibleSkills = useMemo(() => {
        let list = skills;
        if (filter !== "all")
            list = list.filter((s) => s.status === filter);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
        }
        const order = { gap: 0, developing: 1, strong: 2 };
        return [...list].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name)
            : sort === "gap" ? (b.target - b.current) - (a.target - a.current)
                : order[a.status] - order[b.status] || (b.target - b.current) - (a.target - a.current));
    }, [filter, sort, query]);
    const matched = skills.filter((s) => s.status !== "gap").length;
    const gaps = skills.length - matched;
    return (<div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">Gap Analysis</h1>
          <p className="mt-1 text-sm text-ink-500">
            Target role: <span className="font-semibold text-ink-800">{targetRole.title}</span> · framework v3.2 ·{" "}
            <span className="text-ink-400">12 skills · reviewed Nov 1, 2026</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Frontend ×4", "Architecture ×1", "Quality ×2", "DevOps ×1", "Data ×1", "Backend ×1", "Workflow ×2"].map((c) => (<span key={c} className="rounded-full bg-ink-50 px-2.5 py-1 text-[10px] font-semibold text-ink-500 ring-1 ring-ink-100">{c}</span>))}
          </div>
        </div>
        {stage === "results" && (<button onClick={() => { setStage("idle"); setFileName(null); }} className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700">
            <UploadCloud className="h-4 w-4"/> Analyze another resume
          </button>)}
      </div>

      {stage === "idle" && (<div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`group relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition ${dragging ? "border-brand-400 bg-brand-50/70 scale-[1.01]" : "border-ink-200 bg-white hover:border-brand-300 hover:bg-brand-50/30"}`}>
            <div className="absolute inset-0 dot-grid opacity-0 transition group-hover:opacity-100"/>
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:scale-110">
              <UploadCloud className="h-8 w-8"/>
            </span>
            <h2 className="relative mt-5 font-display text-xl font-bold text-ink-950">
              Drop your resume here
            </h2>
            <p className="relative mt-2 max-w-sm text-sm text-ink-500">
              PDF or DOCX, up to 10 MB. We extract skills and experience, then show you everything we found before scoring.
            </p>
            <button onClick={() => runAnalysis("resume_aman_pal.pdf")} className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700">
              <FileText className="h-4 w-4"/> Browse files
            </button>
            <p className="relative mt-4 flex items-center gap-1.5 text-xs text-ink-400">
              <ShieldCheck className="h-3.5 w-3.5"/> Encrypted · deletable anytime · never used for hiring decisions
            </p>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h3 className="font-display text-lg font-bold text-ink-950">What the analysis covers</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Skills evidenced by projects & work history",
                "Proficiency vs. role seniority expectations",
                "Evidence quality & confidence per skill",
                "Prioritized gaps ranked by hire impact",
                "Editable plan before anything is saved",
            ].map((t) => (<li key={t} className="flex items-start gap-2.5 text-sm text-ink-600">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"/>
                  {t}
                </li>))}
            </ul>
            <div className="mt-6 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
              <p className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="h-3.5 w-3.5"/> Planning aid, not a verdict
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-700">
                Results map what your resume evidences against role frameworks. They do not predict employability.
              </p>
            </div>
          </div>

          {/* past analyses */}
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h3 className="font-display text-lg font-bold text-ink-950">Past analyses</h3>
            <p className="mt-0.5 text-xs text-ink-500">Re-run any previous report to track progress</p>
            <ul className="mt-4 space-y-2.5">
              {pastAnalyses.map((a) => (<li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 px-4 py-3 transition hover:border-brand-200">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink-800">{a.id}</p>
                    <p className="text-xs text-ink-400">{a.role} · {a.date}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`font-display text-sm font-bold ${a.score >= 65 ? "text-emerald-600" : a.score >= 55 ? "text-amber-600" : "text-rose-500"}`}>
                      {a.score}%
                    </span>
                    {a.status === "current" && (<span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold uppercase text-brand-700 ring-1 ring-brand-100">current</span>)}
                  </div>
                </li>))}
            </ul>
          </div>
        </div>)}

      {stage === "processing" && (<div className="rounded-2xl border border-ink-100 bg-white p-12">
          <div className="mx-auto max-w-md text-center">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 animate-ping rounded-2xl bg-brand-100/70 [animation-duration:2s]"/>
              <div className="absolute inset-0 animate-pulse-soft rounded-2xl bg-brand-100"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <Radar className="h-10 w-10 animate-pulse-soft text-brand-600"/>
              </div>
            </div>
            <h2 className="mt-6 font-display text-xl font-bold text-ink-950">Analyzing {fileName}</h2>
            <div className="mt-8 space-y-3 text-left">
              {steps.map((s, i) => (<div key={s} className="flex items-center gap-3">
                  {i < stepIdx ? (<CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500"/>) : i === stepIdx ? (<Loader2 className="h-5 w-5 shrink-0 animate-spin text-brand-600"/>) : (<span className="h-5 w-5 shrink-0 rounded-full border-2 border-ink-200"/>)}
                  <span className={`text-sm ${i <= stepIdx ? "font-medium text-ink-800" : "text-ink-400"}`}>
                    {s}
                  </span>
                </div>))}
            </div>
          </div>
        </div>)}

      {stage === "results" && (<div className="space-y-6">
          {/* summary banner */}
          <div className="relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-violet-600 p-6 text-white sm:flex-row sm:items-center">
            <div className="dot-grid absolute inset-0 opacity-20"/>
            <div className="relative">
              <p className="text-sm font-medium text-brand-200">Analysis complete · {fileName}</p>
              <h2 className="mt-1 font-display text-2xl font-bold">
                {matched}/{skills.length} skills evidenced · {gaps} gaps to close
              </h2>
              <p className="mt-1 text-sm text-brand-200">
                Role readiness for {targetRole.title}: {targetRole.matchScore}% — editable before saving
              </p>
            </div>
            <div className="relative flex gap-3">
              <button onClick={() => setCorrecting((c) => !c)} className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
                {correcting ? "Done correcting" : "Correct extraction"}
              </button>
              <button onClick={() => router.push("/app/path")} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">
                Build my path
              </button>
            </div>
          </div>

          {correcting && (<div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
              <p className="text-sm font-semibold text-brand-800">Extraction review mode</p>
              <p className="mt-1 text-xs text-brand-700">
                Click any skill chip below to mark it as mis-extracted — changes apply to your next plan regeneration.
              </p>
            </div>)}

          {/* controls */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-1.5 rounded-full border border-ink-100 bg-white p-1">
              {["all", "gap", "developing", "strong"].map((f) => (<button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition ${filter === f ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-50"}`}>
                  {f === "all" ? "All skills" : statusStyles[f].label}
                  <span className="ml-1.5 opacity-60">
                    {f === "all" ? skills.length : skills.filter((s) => s.status === f).length}
                  </span>
                </button>))}
            </div>
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"/>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter skills or categories…" className="w-full rounded-full border border-ink-200 bg-white py-2 pl-9 pr-4 text-sm outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"/>
            </div>
            <button onClick={() => setSort(sort === "priority" ? "name" : sort === "name" ? "gap" : "priority")} className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-600 transition hover:border-brand-300">
              <ArrowUpDown className="h-3.5 w-3.5"/>
              {sort === "priority" ? "By priority" : sort === "name" ? "A–Z" : "Biggest gap"}
            </button>
          </div>

          {/* heatmap */}
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-ink-950">Skill heatmap</h3>
              <div className="flex gap-2">
                {Object.keys(statusStyles).map((k) => (<span key={k} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${statusStyles[k].chip}`}>
                    {statusStyles[k].label}
                  </span>))}
              </div>
            </div>
            <p className="mt-1 text-xs text-ink-400">
              Solid bar = your evidenced mastery · tick = role target · confidence % = evidence strength
            </p>

            {visibleSkills.length === 0 ? (<p className="mt-10 text-center text-sm text-ink-400">No skills match your filters.</p>) : (<div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {visibleSkills.map((s) => {
                    const st = statusStyles[s.status];
                    const conf = confidenceOf(s.name);
                    return (<div key={s.name} className="group rounded-xl p-2 -m-2 transition hover:bg-ink-50/60">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className={`h-2 w-2 shrink-0 rounded-full ${st.dot}`}/>
                          <span className="truncate text-sm font-medium text-ink-800">{s.name}</span>
                          <span className="shrink-0 rounded bg-ink-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-400 ring-1 ring-ink-100">
                            {s.category}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[10px] font-semibold text-ink-400">{conf}% conf.</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${st.chip}`}>
                            {st.label}
                          </span>
                        </div>
                      </div>
                      <div className="relative mt-2 h-2">
                        <div className="absolute inset-0 rounded-full bg-ink-100"/>
                        <div className={`absolute inset-y-0 left-0 rounded-full ${st.bar} opacity-90 transition-all`} style={{ width: `${s.current}%` }}/>
                        <div className="absolute -top-0.5 h-3 w-0.5 bg-ink-800" style={{ left: `${s.target}%` }} title={`Target: ${s.target}`}/>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-400">
                        <span>you: <b className="text-ink-600">{s.current}</b></span>
                        <span>target: <b className="text-ink-600">{s.target}</b></span>
                        <span className="opacity-0 transition group-hover:opacity-100">Δ {(s.target - s.current).toFixed(0)} pts</span>
                      </div>
                      {s.evidence && (<p className="mt-1 truncate text-[11px] italic text-ink-400">“{s.evidence}”</p>)}
                    </div>);
                })}
              </div>)}
          </div>

          {/* next step CTA */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-violet-50 p-6 sm:flex-row">
            <div>
              <h3 className="font-display text-lg font-bold text-ink-950">Ready to close {gaps} gaps?</h3>
              <p className="mt-1 text-sm text-ink-600">
                Generate a week-by-week plan with milestones sized to ~6h/week.
              </p>
            </div>
            <button onClick={() => router.push("/app/path")} className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700">
              Generate learning path
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
            </button>
          </div>
        </div>)}
    </div>);
}
