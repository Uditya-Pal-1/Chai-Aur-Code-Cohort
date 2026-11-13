"use client";

import { useEffect, useState } from "react";
import {
  User,
  Target,
  Clock,
  Bell,
  Palette,
  ShieldCheck,
  Download,
  Trash2,
  Save,
  Check,
  CreditCard,
} from "lucide-react";
import { getProfile, setProfile, getSession, DEFAULT_PROFILE, type Profile } from "@/lib/auth";
import { roles } from "@/lib/data";

const accents = ["#6a5cf0", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e", "#111827"];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-brand-600" : "bg-ink-200"}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [profile, setLocal] = useState<Profile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);
  const [session, setSess] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    setLocal(getProfile());
    const s = getSession();
    if (s) setSess(s);
  }, []);

  const update = (patch: Partial<Profile>) => {
    setLocal((p) => {
      const next = { ...p, ...patch };
      setProfile(next);
      return next;
    });
  };

  const saveAll = () => {
    setProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">Settings</h1>
          <p className="mt-1 text-sm text-ink-500">Customize your workspace — changes apply instantly.</p>
        </div>
        <button
          onClick={saveAll}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          {saved ? <Check className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      {/* Profile */}
      <section className="rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
          <User className="h-5 w-5 text-brand-600" /> Profile
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">Display name</label>
            <input
              defaultValue={session?.name || "Aman Pal"}
              className="w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">Email</label>
            <input
              defaultValue={session?.email || "aman@example.com"}
              className="w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
      </section>

      {/* Career goals */}
      <section className="rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
          <Target className="h-5 w-5 text-brand-600" /> Career goals
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">Target role</label>
            <select
              value={profile.targetRole}
              onChange={(e) => update({ targetRole: e.target.value })}
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            >
              {roles.map((r) => (
                <option key={r.title} value={r.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")}>
                  {r.title} — {r.avgSalary}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink-400">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Weekly hours</span>
              <span className="text-brand-600">{profile.weeklyHours}h</span>
            </label>
            <input
              type="range"
              min={2}
              max={20}
              value={profile.weeklyHours}
              onChange={(e) => update({ weeklyHours: Number(e.target.value) })}
              className="mt-3 w-full accent-brand-500"
            />
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
          <Palette className="h-5 w-5 text-brand-600" /> Appearance
        </h2>
        <div className="mt-5 flex items-center gap-3">
          {accents.map((c) => (
            <button
              key={c}
              onClick={() => update({ accent: c })}
              className={`h-9 w-9 rounded-full transition ${profile.accent === c ? "ring-2 ring-ink-900 ring-offset-2" : "hover:scale-110"}`}
              style={{ backgroundColor: c }}
              aria-label={`Accent ${c}`}
            />
          ))}
          <span className="ml-2 text-xs text-ink-400">Applies to highlights across the app</span>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
          <Bell className="h-5 w-5 text-brand-600" /> Notifications
        </h2>
        <div className="mt-4 divide-y divide-ink-50">
          {[
            { key: "weekly" as const, label: "Weekly progress digest", desc: "Every Sunday: what you completed and what's next" },
            { key: "milestones" as const, label: "Milestone alerts", desc: "When a week unlocks or a portfolio proof is ready" },
            { key: "insights" as const, label: "AI coach insights", desc: "New gap analysis findings and readiness changes" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-ink-800">{n.label}</p>
                <p className="text-xs text-ink-500">{n.desc}</p>
              </div>
              <Toggle
                on={profile.notifications[n.key]}
                onChange={(v) => update({ notifications: { ...profile.notifications, [n.key]: v } })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Plan & billing */}
      <section className="rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
          <CreditCard className="h-5 w-5 text-brand-600" /> Plan & billing
        </h2>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 p-5 text-white sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold">Pro — $15/mo (annual)</p>
            <p className="mt-0.5 text-xs text-brand-100">Renews Nov 28 · unlimited analyses & full paths</p>
          </div>
          <div className="flex gap-2">
            <a href="/pricing" className="rounded-full bg-white/15 px-4 py-2 text-center text-xs font-semibold backdrop-blur hover:bg-white/25">Manage plan</a>
            <a href="/pricing" className="rounded-full bg-white px-4 py-2 text-center text-xs font-bold text-brand-700 hover:bg-brand-50">Upgrade to Teams</a>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Analyses used", val: "4 / ∞", pct: 100 },
            { label: "Path weeks unlocked", val: "6 / 6", pct: 100 },
            { label: "Portfolio proofs", val: "2 / 6", pct: 33 },
          ].map((u) => (
            <div key={u.label} className="rounded-xl border border-ink-100 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{u.label}</p>
              <p className="mt-1 font-display text-lg font-bold text-ink-950">{u.val}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${u.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
          <ShieldCheck className="h-5 w-5 text-brand-600" /> Privacy & data
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Your resume and plans are yours. Export everything or delete your account at any time.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify({ profile, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "atellixcareer-data.json";
              a.click();
              URL.revokeObjectURL(a.href);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            <Download className="h-4 w-4" /> Export my data
          </button>
          <button
            onClick={() => {
              if (confirm("Delete your account and all career data? This cannot be undone.")) {
                localStorage.clear();
                window.location.href = "/";
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-5 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" /> Delete account
          </button>
        </div>
      </section>
    </div>
  );
}
