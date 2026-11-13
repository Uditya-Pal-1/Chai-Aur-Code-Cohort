"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, AlertCircle, Loader2, Eye, EyeOff, Sparkles } from "lucide-react";
import { setSession } from "@/lib/auth";
import Logo from "@/components/Logo";
import { BackgroundBeams } from "@/components/ui/aceternity";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = params.get("next") || "/app";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    // Demo auth — swap for real provider (Auth.js/Clerk) in production.
    setTimeout(() => {
      const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      setSession({ email, name: name || "Learner", role: "user" });
      router.push(next);
    }, 900);
  };

  const quickAdmin = () => {
    setSession({ email: "admin@atellix.dev", name: "Root Admin", role: "admin" });
    router.push("/admin");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4 py-16">
      <BackgroundBeams />
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl lg:grid-cols-[1.1fr_1fr]">
        {/* value panel */}
        <div className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-brand-600/20 to-violet-600/10 p-10 lg:flex">
          <Logo dark />
          <div>
            <h2 className="font-display text-2xl font-bold leading-snug text-white">
              Your career plan is waiting.
              <span className="text-brand-300"> Pick up where you left off.</span>
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                { t: "68% role readiness", d: "Senior Frontend Engineer · updated 2h ago" },
                { t: "Week 3 of 6", d: "System Design for Frontend — 62% complete" },
                { t: "12-day streak", d: "Personal best: 21 days" },
              ].map((s) => (
                <li key={s.t} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <div>
                    <p className="text-sm font-bold text-white">{s.t}</p>
                    <p className="text-xs text-ink-300">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs leading-relaxed text-ink-400">
            Signed in on 3 devices · last active today, 9:42 AM
          </p>
        </div>

        <div className="p-8 sm:p-10">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-ink-300">Pick up your learning path where you left off.</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
            >
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </motion.div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-ink-500 focus:border-brand-400 focus:bg-white/10 focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-ink-400">Password</label>
                <button type="button" className="text-xs font-medium text-brand-300 hover:text-brand-200">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white outline-none transition placeholder:text-ink-500 focus:border-brand-400 focus:bg-white/10 focus:ring-2 focus:ring-brand-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-500 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Log in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-ink-500">
            <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-2.5">
            <button className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-ink-200 transition hover:bg-white/10">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a7.16 7.16 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Continue with Google
            </button>
            <button
              onClick={quickAdmin}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
            >
              <Sparkles className="h-4 w-4" />
              Demo: sign in as Admin
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-ink-400">
            New here?{" "}
            <Link href="/onboarding" className="font-semibold text-brand-300 hover:text-brand-200">
              Start free — no card required
            </Link>
          </p>
        </div>

        <p className="border-t border-white/10 px-8 py-4 text-center text-[11px] text-ink-500 lg:hidden">
          Your career data is encrypted and never sold.
        </p>
      </div>

      <p className="absolute bottom-6 hidden items-center justify-center gap-1.5 text-xs text-ink-500 lg:flex">
        <ShieldCheck className="h-3.5 w-3.5" /> Your career data is encrypted and never sold.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
