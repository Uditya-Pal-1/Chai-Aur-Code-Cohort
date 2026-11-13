"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Radar,
  GitBranch,
  Bot,
  CreditCard,
  Search,
  ArrowUpRight,
  TrendingUp,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Ban,
} from "lucide-react";
import {
  adminUsers,
  adminAssessments,
  roleFrameworks,
  revenueByMonth,
  funnel,
  aiUsage,
  type AdminUser,
} from "@/lib/admin-data";
import { getSession, type SessionUser } from "@/lib/auth";
import { ActivityHeatmap } from "@/components/charts";

type Tab = "overview" | "users" | "assessments" | "frameworks" | "ai" | "billing";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "assessments", label: "Assessments", icon: Radar },
  { id: "frameworks", label: "Role Frameworks", icon: GitBranch },
  { id: "ai", label: "AI & System", icon: Bot },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const planStyle: Record<string, string> = {
  Free: "bg-ink-50 text-ink-600 ring-ink-200",
  Pro: "bg-brand-50 text-brand-700 ring-brand-200",
  Teams: "bg-violet-50 text-violet-700 ring-violet-200",
};
const statusStyle: Record<string, { cls: string; icon: typeof CheckCircle2 }> = {
  active: { cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: CheckCircle2 },
  trialing: { cls: "bg-amber-50 text-amber-700 ring-amber-200", icon: Clock },
  churned: { cls: "bg-rose-50 text-rose-600 ring-rose-200", icon: Ban },
};

export default function AdminPage() {
  const [session, setSess] = useState<SessionUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSess(getSession());
    setChecked(true);
  }, []);

  if (!checked) {
    return <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink-400">Loading…</div>;
  }

  if (!session || session.role !== "admin") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-200">
          <ShieldCheck className="h-8 w-8" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">Admin access required</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          You're signed in as <b>{session?.email || "a guest"}</b>. The admin panel requires an admin role.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-800">
            Sign in
          </Link>
          <Link href="/" className="rounded-full border border-ink-200 px-6 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  const filteredUsers = adminUsers.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
  );
  const maxMRR = Math.max(...revenueByMonth.map((r) => r.mrr));

  return (
    <div className="mx-auto max-w-7xl">
      {/* header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">Admin Panel</h1>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-300">
              Full access
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-500">
            Signed in as <span className="font-semibold text-ink-700">{session.email}</span> · platform-wide controls
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users…"
            className="w-64 rounded-full border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {/* tabs */}
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-2xl border border-ink-100 bg-white p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-ink-900 text-white shadow" : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "overview" && <Overview />}
        {tab === "users" && <UsersTable users={filteredUsers} />}
        {tab === "assessments" && <AssessmentsTable />}
        {tab === "frameworks" && <FrameworksTable />}
        {tab === "ai" && <AISystem />}
        {tab === "billing" && <Billing maxMRR={maxMRR} />}
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */

function Overview() {
  const stats = [
    { label: "Total users", value: "9,310", delta: "+12.4%", icon: Users, tone: "text-brand-600 bg-brand-50" },
    { label: "Analyses run", value: "4,470", delta: "+8.1%", icon: Radar, tone: "text-emerald-600 bg-emerald-50" },
    { label: "Pro conversion", value: "2.4%", delta: "+0.6pt", icon: TrendingUp, tone: "text-amber-600 bg-amber-50" },
    { label: "MRR", value: "$31.4k", delta: "+17%", icon: CreditCard, tone: "text-violet-600 bg-violet-50" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink-500">{s.label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone}`}>
                <s.icon className="h-4.5 w-4.5" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950">{s.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" /> {s.delta} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* funnel */}
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-ink-950">Activation funnel</h3>
          <p className="mt-0.5 text-xs text-ink-500">Last 30 days · signup → paid</p>
          <div className="mt-5 space-y-3">
            {funnel.map((f) => (
              <div key={f.stage} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-xs font-medium text-ink-600">{f.stage}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-lg bg-ink-50">
                  <div
                    className="flex h-full items-center rounded-lg bg-gradient-to-r from-brand-500 to-violet-500 pl-2.5 text-[10px] font-bold text-white transition-all"
                    style={{ width: `${Math.max(f.pct, 6)}%` }}
                  >
                    {f.pct > 8 ? `${f.pct}%` : ""}
                  </div>
                </div>
                <span className="w-14 shrink-0 text-right text-xs font-bold text-ink-700">{f.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* activity heatmap + alerts */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h3 className="font-display text-lg font-bold text-ink-950">Platform activity</h3>
            <p className="mt-0.5 text-xs text-ink-500">Daily active analyses, 18 weeks</p>
            <div className="mt-4">
              <ActivityHeatmap />
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <AlertTriangle className="h-4 w-4" /> Needs attention
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-amber-800">
              <li>· 3 assessments failed schema validation in the last 24h</li>
              <li>· "backend-engineer" framework v2.5 is pending review (14 days)</li>
              <li>· LLM fallback rate hit 58% — check API key quota</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Users ---------- */

function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
        <h3 className="font-display font-bold text-ink-950">Users</h3>
        <button
          onClick={() => {
            const email = window.prompt("Invite user — enter their email:");
            if (email?.includes("@")) alert(`Invitation sent to ${email}`);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white hover:bg-ink-800"
        >
          <UserPlus className="h-3.5 w-3.5" /> Invite user
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-[11px] uppercase tracking-wide text-ink-500">
              <th className="px-6 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Plan</th>
              <th className="px-4 py-3 font-semibold">Readiness</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Streak</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Joined</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const st = statusStyle[u.status];
              return (
                <tr key={u.id} className="border-b border-ink-50 transition hover:bg-brand-50/40">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-[10px] font-bold text-white">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div>
                        <p className="font-semibold text-ink-900">{u.name}</p>
                        <p className="text-xs text-ink-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${planStyle[u.plan]}`}>{u.plan}</span></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-100">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${u.readiness}%` }} />
                      </div>
                      <span className="text-xs font-bold text-ink-700">{u.readiness}%</span>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3.5 text-xs text-ink-600 sm:table-cell">🔥 {u.streak}d</td>
                  <td className="hidden px-4 py-3.5 text-xs text-ink-500 md:table-cell">{u.joined}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${st.cls}`}>
                      <st.icon className="h-3 w-3" /> {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => navigator.clipboard?.writeText(u.email).catch(() => {})}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Assessments ---------- */

function AssessmentsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="border-b border-ink-100 px-6 py-4">
        <h3 className="font-display font-bold text-ink-950">Recent gap analyses</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-[11px] uppercase tracking-wide text-ink-500">
              <th className="px-6 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Target role</th>
              <th className="px-4 py-3 font-semibold">Score</th>
              <th className="px-4 py-3 font-semibold">Gaps</th>
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {adminAssessments.map((a) => (
              <tr key={a.id} className="border-b border-ink-50 hover:bg-ink-50/50">
                <td className="px-6 py-3 font-mono text-xs text-ink-400">{a.id}</td>
                <td className="px-4 py-3 font-medium text-ink-800">{a.user}</td>
                <td className="px-4 py-3 text-ink-600">{a.role}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${a.score >= 70 ? "text-emerald-600" : a.score >= 50 ? "text-amber-600" : "text-rose-500"}`}>
                    {a.score}%
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-600">{a.gaps}</td>
                <td className="px-4 py-3"><span className="rounded bg-ink-50 px-2 py-0.5 font-mono text-[10px] text-ink-500 ring-1 ring-ink-100">{a.model}</span></td>
                <td className="px-4 py-3 text-xs text-ink-500">{a.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Frameworks ---------- */

function FrameworksTable() {
  const fwStyle: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    review: "bg-amber-50 text-amber-700 ring-amber-200",
    draft: "bg-ink-50 text-ink-500 ring-ink-200",
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
        <div>
          <h3 className="font-display font-bold text-ink-950">Role skill frameworks</h3>
          <p className="text-xs text-ink-500">Versioned skill expectations powering gap analysis</p>
        </div>
        <button
          onClick={() => {
            const title = window.prompt("New role framework — enter role title:");
            if (title) alert(`Draft framework "${title}" created — review before publishing.`);
          }}
          className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
        >
          + New framework
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-[11px] uppercase tracking-wide text-ink-500">
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Version</th>
              <th className="px-4 py-3 font-semibold">Skills</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {roleFrameworks.map((f) => (
              <tr key={f.key} className="border-b border-ink-50 hover:bg-ink-50/50">
                <td className="px-6 py-3.5 font-semibold text-ink-900">{f.title}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-500">v{f.version}</td>
                <td className="px-4 py-3.5 text-ink-600">{f.skills}</td>
                <td className="px-4 py-3.5 text-xs text-ink-500">{f.updated}</td>
                <td className="px-4 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${fwStyle[f.status]}`}>{f.status}</span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    onClick={() => {
                      const v = window.prompt(`Edit ${f.title} — new version (current v${f.version}):`, (parseFloat(f.version) + 0.1).toFixed(1));
                      if (v) alert(`${f.title} bumped to v${v} — republish to apply.`);
                    }}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- AI & System ---------- */

function AISystem() {
  const [llmKey, setLlmKey] = useState(true);
  const [fallback, setFallback] = useState(true);
  const [maxTokens, setMaxTokens] = useState(2048);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <h3 className="flex items-center gap-2 font-display font-bold text-ink-950">
          <Bot className="h-5 w-5 text-brand-600" /> Model routing
        </h3>
        <p className="mt-1 text-xs text-ink-500">Controls which engine handles resume parsing & plan generation</p>
        <div className="mt-5 space-y-3">
          {aiUsage.map((m) => (
            <div key={m.model} className="rounded-xl border border-ink-100 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-ink-800">{m.model}</span>
                <span className="text-xs text-ink-400">{m.calls.toLocaleString()} calls · {m.share}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500" style={{ width: `${m.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <h3 className="font-display font-bold text-ink-950">Runtime controls</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: "LLM provider enabled", desc: "Route analyses through the configured LLM", on: llmKey, set: setLlmKey },
              { label: "Heuristic fallback", desc: "Always available when LLM is down or unconfigured", on: fallback, set: setFallback },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink-800">{t.label}</p>
                  <p className="text-xs text-ink-500">{t.desc}</p>
                </div>
                <button
                  onClick={() => t.set(!t.on)}
                  className={`relative h-6 w-11 rounded-full transition ${t.on ? "bg-brand-600" : "bg-ink-200"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${t.on ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            ))}
            <div>
              <label className="mb-1.5 flex justify-between text-xs font-semibold uppercase tracking-wide text-ink-400">
                <span>Max output tokens</span><span className="text-brand-600">{maxTokens}</span>
              </label>
              <input type="range" min={512} max={8192} step={256} value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))} className="w-full accent-brand-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
          <h3 className="font-display font-bold text-rose-900">Danger zone</h3>
          <p className="mt-1 text-xs text-rose-700">These actions affect all users and cannot be undone.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => confirm("Flush the analysis cache for all users?") && alert("Cache flushed.")}
              className="rounded-full border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100"
            >
              Flush analysis cache
            </button>
            <button
              onClick={() => confirm("Rebuild role indexes now?") && alert("Rebuild queued — completes in ~2 min.")}
              className="rounded-full border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100"
            >
              Rebuild role indexes
            </button>
            <button
              onClick={() => {
                const on = confirm("Enable maintenance mode? Users will see a notice page.");
                alert(on ? "Maintenance mode enabled." : "Cancelled.");
              }}
              className="rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
            >
              Maintenance mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Billing ---------- */

function Billing({ maxMRR }: { maxMRR: number }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-ink-950">Monthly recurring revenue</h3>
            <p className="text-xs text-ink-500">Pro + Teams subscriptions</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
            +17.2% MoM
          </span>
        </div>
        <div className="mt-6 flex h-44 items-end gap-3">
          {revenueByMonth.map((r) => (
            <div key={r.m} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-ink-500">${(r.mrr / 1000).toFixed(1)}k</span>
              <Bar className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-violet-400" style={{ height: `${(r.mrr / maxMRR) * 130}px` }} />
              <span className="text-[10px] font-semibold text-ink-400">{r.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <h3 className="font-display font-bold text-ink-950">Plan distribution</h3>
          <div className="mt-4 space-y-3">
            {[
              { plan: "Free", pct: 71, cls: "bg-ink-300" },
              { plan: "Pro", pct: 23, cls: "bg-brand-500" },
              { plan: "Teams", pct: 6, cls: "bg-violet-500" },
            ].map((p) => (
              <div key={p.plan}>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-ink-700">{p.plan}</span>
                  <span className="text-ink-500">{p.pct}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-100">
                  <div className={`h-full rounded-full ${p.cls}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <h3 className="font-display font-bold text-ink-950">Recent invoices</h3>
          <ul className="mt-3 divide-y divide-ink-50 text-sm">
            {[
              { who: "Elena Rossi · Teams", amt: "$588", date: "Nov 1", ok: true },
              { who: "Priya Sharma · Pro", amt: "$15", date: "Oct 28", ok: true },
              { who: "Sara Kim · Pro", amt: "$15", date: "Oct 24", ok: true },
              { who: "Jonas Weber · Pro", amt: "$15", date: "Oct 19", ok: false },
            ].map((inv, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-medium text-ink-800">{inv.who}</p>
                  <p className="text-xs text-ink-400">{inv.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink-900">{inv.amt}</span>
                  <span className={`text-[10px] font-bold ${inv.ok ? "text-emerald-600" : "text-rose-500"}`}>{inv.ok ? "Paid" : "Failed"}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Bar({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={className} style={style} />;
}
