"use client";

import { useState } from "react";
import {
  FolderGit2,
  FileText,
  Globe,
  Briefcase,
  CheckCircle2,
  CircleDot,
  Lock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { portfolioMilestones } from "@/lib/data";
import SharePortfolio from "@/components/SharePortfolio";

const proofIcons: Record<string, typeof FolderGit2> = {
  "Live app": Globe,
  Repo: FolderGit2,
  Report: FileText,
  "Case study": FileText,
  Portfolio: Briefcase,
};

const columns = [
  { key: "done", label: "Completed", dot: "bg-emerald-500" },
  { key: "active", label: "In progress", dot: "bg-brand-500" },
  { key: "locked", label: "Upcoming", dot: "bg-ink-200" },
] as const;

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try { await navigator.clipboard.writeText("https://atellixcareer.com/p/aman-pal"); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">Portfolio Milestones</h1>
          <p className="mt-1 text-sm text-ink-500">
            Proof points your interviews can verify — repos, live apps, and case studies.
          </p>
        </div>
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          <Sparkles className="h-4 w-4" /> {copied ? "Link copied!" : "Share portfolio"}
        </button>
      </div>

      <SharePortfolio />

      {/* how proof works */}
      <div className="grid gap-4 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50/70 to-violet-50/70 p-6 sm:grid-cols-3">
        {[
          { step: "1", t: "Do the work", d: "Each milestone is a real deliverable — not a quiz or badge." },
          { step: "2", t: "We verify it", d: "Repos link out, live apps deploy, case studies get reviewed." },
          { step: "3", t: "Interviews confirm it", d: "Your portfolio answers 'prove it' before they ask." },
        ].map((s) => (
          <div key={s.step} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-bold text-white">{s.step}</span>
            <div>
              <p className="text-sm font-bold text-ink-900">{s.t}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-600">{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((col) => {
          const items = portfolioMilestones.filter((m) => m.status === col.key);
          return (
            <div key={col.key} className="rounded-2xl border border-ink-100 bg-ink-50/50 p-4">
              <div className="flex items-center gap-2 px-2 pb-3">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                <h2 className="text-sm font-bold text-ink-800">{col.label}</h2>
                <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-ink-500 ring-1 ring-ink-100">
                  {items.length}
                </span>
              </div>
              <div className="space-y-3">
                {items.map((m) => {
                  const Icon = proofIcons[m.proofType] ?? FileText;
                  return (
                    <div
                      key={m.title}
                      className={`rounded-xl border bg-white p-4 ${
                        m.status === "locked" ? "border-ink-100 opacity-70" : "border-ink-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          m.status === "done" ? "bg-emerald-50 text-emerald-600" :
                          m.status === "active" ? "bg-brand-50 text-brand-600" : "bg-ink-50 text-ink-400"
                        }`}>
                          {m.status === "locked" ? <Lock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                        </span>
                        {m.status === "done" && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                        {m.status === "active" && (
                          <CircleDot className="h-4 w-4 text-brand-500" />
                        )}
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-ink-900">{m.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-ink-500">{m.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-semibold text-ink-500 ring-1 ring-ink-100">
                          Week {m.week} · {m.proofType}
                        </span>
                        {m.status !== "locked" && (
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(`https://atellixcareer.com/p/aman-pal/${m.title.toLowerCase().replace(/\s+/g, "-")}`).catch(() => {});
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                          >
                            {m.status === "done" ? "View proof ↗" : "Continue →"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-ink-200 px-4 py-8 text-center text-xs text-ink-400">
                    Nothing here yet
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
