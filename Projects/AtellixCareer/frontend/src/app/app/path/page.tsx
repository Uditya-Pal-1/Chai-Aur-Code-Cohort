"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  FolderGit2,
  FileText,
  Clock,
  ChevronDown,
  Sparkles,
  PartyPopper,
  Loader2,
} from "lucide-react";
import { learningPath, type WeekModule } from "@/lib/data";

const resourceIcon = { Docs: BookOpen, Course: BookOpen, Project: FolderGit2, Exercise: FileText };

export default function PathPage() {
  const [openWeek, setOpenWeek] = useState<number>(
    learningPath.find((w) => w.status === "current")?.week ?? 1
  );
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [completedWeeks, setCompletedWeeks] = useState<Set<number>>(
    new Set(learningPath.filter((w) => w.status === "done").map((w) => w.week))
  );

  const [regen, setRegen] = useState(false);
  const regenerate = () => {
    setRegen(true);
    setTimeout(() => setRegen(false), 1600);
  };

  const toggle = (w: number) => setOpenWeek(openWeek === w ? 0 : w);
  const toggleResource = (key: string) => setDone((d) => ({ ...d, [key]: !d[key] }));

  const completeWeek = (week: number) => {
    setCompletedWeeks((s) => new Set(s).add(week));
    setOpenWeek((w) => (w === week ? 0 : w));
  };

  const totalDone = learningPath.filter((w) => completedWeeks.has(w.week)).length;
  const pct = Math.round((totalDone / learningPath.length) * 100);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">Learning Path</h1>
          <p className="mt-1 text-sm text-ink-500">
            6-week plan toward <span className="font-semibold text-ink-800">Senior Frontend Engineer</span> · ~40h total · generated from gap analysis #a1
          </p>
        </div>
        <button
          onClick={regenerate}
          disabled={regen}
          className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 disabled:opacity-60"
        >
          {regen ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-brand-500" />}
          {regen ? "Regenerating…" : "Regenerate plan"}
        </button>
      </div>

      {/* progress bar */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-6 text-sm font-medium text-ink-600">
            <span>Overall completion <b className="text-ink-900">{pct}%</b></span>
            <span className="hidden sm:inline">~<b className="text-ink-900">26h</b> remaining</span>
            <span className="hidden md:inline">On track for <b className="text-ink-900">Dec 24</b></span>
          </div>
          <span className="text-xs font-semibold text-emerald-600">🔥 12-day streak — keep it up</span>
        </div>
        <div className="mt-2 flex gap-1">
          {learningPath.map((w) => {
            const isDone = completedWeeks.has(w.week);
            const isCurrent = !isDone && w.status !== "upcoming" && !completedWeeks.has(w.week - 1) && w.week === Math.min(...learningPath.filter(x => !completedWeeks.has(x.week)).map(x => x.week), 99);
            return (
              <div
                key={w.week}
                className={`h-2.5 flex-1 rounded-full transition-all ${
                  isDone ? "bg-emerald-500" : isCurrent ? "bg-brand-500" : "bg-ink-100"
                }`}
                title={`Week ${w.week}${isDone ? " — done" : ""}`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wide text-ink-400">
          {learningPath.map((w) => (
            <span key={w.week} className={completedWeeks.has(w.week) ? "text-emerald-600" : ""}>W{w.week}</span>
          ))}
        </div>
      </div>

      {/* weeks */}
      <div className="relative space-y-4">
        <div className="absolute bottom-8 left-[27px] top-8 w-px bg-ink-100" />
        {learningPath.map((w) => (
          <WeekCard
            key={w.week}
            week={w}
            open={openWeek === w.week}
            onToggle={() => toggle(w.week)}
            done={done}
            onToggleResource={toggleResource}
            isWeekDone={completedWeeks.has(w.week)}
            onComplete={() => completeWeek(w.week)}
          />
        ))}
      </div>

      {pct === 100 && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <PartyPopper className="h-6 w-6 text-emerald-600" />
          <div>
            <p className="font-display font-bold text-emerald-900">Path complete!</p>
            <p className="text-sm text-emerald-700">Your portfolio milestones are ready to share with employers.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function WeekCard({
  week,
  open,
  onToggle,
  done,
  onToggleResource,
  isWeekDone,
  onComplete,
}: {
  week: WeekModule;
  open: boolean;
  onToggle: () => void;
  done: Record<string, boolean>;
  onToggleResource: (key: string) => void;
  isWeekDone: boolean;
  onComplete: () => void;
}) {
  const locked = week.status === "upcoming";
  const resDone = week.resources.filter((_, i) => done[`${week.week}-${i}`]).length;
  const allDone = resDone === week.resources.length;

  return (
    <div
      className={`relative ml-0 rounded-2xl border bg-white transition ${
        isWeekDone
          ? "border-emerald-200"
          : week.status === "current"
            ? "border-brand-300 shadow-lg shadow-brand-500/10"
            : "border-ink-100"
      } ${locked && !isWeekDone ? "opacity-80" : ""}`}
    >
      <button onClick={onToggle} className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6">
        <span
          className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-ink-50 ${
            isWeekDone
              ? "bg-emerald-500 text-white"
              : week.status === "current"
                ? "bg-brand-600 text-white"
                : "bg-ink-100 text-ink-400"
          }`}
        >
          {isWeekDone ? <CheckCircle2 className="h-5 w-5" /> : locked ? <Lock className="h-4 w-4" /> : week.week}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`font-display text-base font-bold ${locked && !isWeekDone ? "text-ink-400" : "text-ink-950"}`}>
              Week {week.week} — {week.theme}
            </h3>
            {week.status === "current" && !isWeekDone && (
              <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                In progress
              </span>
            )}
            {isWeekDone && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                Completed
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-sm text-ink-500">
            {week.focus} · {week.hours}h · {resDone}/{week.resources.length} resources
          </p>
        </div>
        {/* mini progress */}
        {!locked && !isWeekDone && (
          <div className="hidden w-24 sm:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${(resDone / week.resources.length) * 100}%` }}
              />
            </div>
          </div>
        )}
        <ChevronDown className={`h-5 w-5 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-ink-100 px-5 py-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Milestones</p>
              <ul className="mt-2 space-y-2">
                {week.milestones.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-ink-700">
                    {isWeekDone ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                    )}
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Resources — check off as you go</p>
              <ul className="mt-2 space-y-2">
                {week.resources.map((r, i) => {
                  const key = `${week.week}-${i}`;
                  const checked = !!done[key];
                  const Icon = resourceIcon[r.type as keyof typeof resourceIcon] ?? BookOpen;
                  return (
                    <li key={r.title}>
                      <button
                        onClick={() => onToggleResource(key)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
                          checked
                            ? "border-emerald-200 bg-emerald-50/60"
                            : "border-ink-100 hover:border-brand-200"
                        }`}
                      >
                        {checked ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-ink-300" />
                        )}
                        <Icon className={`h-4 w-4 shrink-0 ${checked ? "text-emerald-500" : "text-brand-600"}`} />
                        <span className={`min-w-0 flex-1 truncate text-sm font-medium ${checked ? "text-ink-400 line-through" : "text-ink-800"}`}>
                          {r.title}
                        </span>
                        <span className="flex shrink-0 items-center gap-1 text-xs text-ink-400">
                          <Clock className="h-3 w-3" /> {r.duration}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {!locked && !isWeekDone && (
            <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
              <p className="text-xs text-ink-400">
                {allDone ? "All resources done — ready to mark the week complete." : `${resDone} of ${week.resources.length} resources checked off`}
              </p>
              <button
                onClick={onComplete}
                disabled={!allDone}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  allDone
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700"
                    : "cursor-not-allowed bg-ink-100 text-ink-400"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" /> Mark week complete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
