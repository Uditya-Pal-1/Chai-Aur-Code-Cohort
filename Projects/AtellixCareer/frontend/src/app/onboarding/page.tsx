"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Target,
  Clock,
  UploadCloud,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";
import { setProfile, setSession, DEFAULT_PROFILE } from "@/lib/auth";
import Logo from "@/components/Logo";
import { BackgroundBeams } from "@/components/ui/aceternity";
import { roles } from "@/lib/data";

const experiences = [
  { id: "student", label: "Student", icon: GraduationCap, desc: "In school or bootcamp" },
  { id: "career-changer", label: "Career changer", icon: Compass, desc: "Switching into tech" },
  { id: "1-3", label: "1–3 years", icon: Code2, desc: "Early career engineer" },
  { id: "3-6", label: "3–6 years", icon: Briefcase, desc: "Mid-level engineer" },
  { id: "6+", label: "6+ years", icon: Briefcase, desc: "Senior / staff" },
];

const stepMeta = [
  { title: "What's your target role?", sub: "We map your resume against this role's skill framework." },
  { title: "How much time per week?", sub: "We'll size your plan to fit your real schedule." },
  { title: "Where are you starting from?", sub: "This calibrates difficulty and resource depth." },
  { title: "Upload your resume", sub: "Last step — then your gap analysis begins." },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(DEFAULT_PROFILE.targetRole);
  const [hours, setHours] = useState(DEFAULT_PROFILE.weeklyHours);
  const [experience, setExperience] = useState(DEFAULT_PROFILE.experience);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const canNext = step === 3 ? !!fileName : true;

  const finish = () => {
    setProfile({ targetRole: role, weeklyHours: hours, experience });
    setSession({ email: "you@example.com", name: "New Member", role: "user" });
    router.push("/app/analysis");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4 py-12">
      <BackgroundBeams />
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl"
      >
        {/* header */}
        <div className="mb-8 flex items-center justify-between">
          <Logo dark />
          <button onClick={() => router.push("/")} className="text-sm text-ink-400 hover:text-white">
            Skip for now
          </button>
        </div>

        {/* progress */}
        <div className="mb-8 flex gap-2">
          {stepMeta.map((_, i) => (
            <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-400"
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Step {step + 1} of {stepMeta.length}</p>
              <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{stepMeta[step].title}</h1>
              <p className="mt-2 text-sm text-ink-300">{stepMeta[step].sub}</p>

              <div className="mt-8">
                {step === 0 && (
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {roles.slice(0, 6).map((r) => (
                      <button
                        key={r.title}
                        onClick={() => setRole(r.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, ""))}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${
                          role === r.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")
                            ? "border-brand-400 bg-brand-500/15 text-white"
                            : "border-white/10 bg-white/5 text-ink-200 hover:border-white/25"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold">{r.title}</p>
                          <p className="text-xs text-ink-400">{r.avgSalary}</p>
                        </div>
                        {role === r.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "") && (
                          <Check className="h-4 w-4 text-brand-300" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <div className="flex items-end justify-between">
                      <span className="font-display text-6xl font-bold text-white">{hours}<span className="text-2xl text-ink-400">h</span></span>
                      <span className="text-sm text-ink-400">per week</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={20}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="mt-8 w-full accent-brand-500"
                    />
                    <div className="mt-2 flex justify-between text-xs text-ink-500">
                      <span>2h · casual</span><span>20h · intense</span>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
                      {["~4 week path", "~6 week path", "~3 week sprint"].map((t, i) => (
                        <div key={t} className={`rounded-xl border px-3 py-3 ${hours <= 5 ? (i === 0 ? "border-brand-400 bg-brand-500/15 text-white" : "border-white/10 text-ink-400") : hours <= 10 ? (i === 1 ? "border-brand-400 bg-brand-500/15 text-white" : "border-white/10 text-ink-400") : (i === 2 ? "border-brand-400 bg-brand-500/15 text-white" : "border-white/10 text-ink-400")}`}>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {experiences.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setExperience(e.id)}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                          experience === e.id
                            ? "border-brand-400 bg-brand-500/15 text-white"
                            : "border-white/10 bg-white/5 text-ink-200 hover:border-white/25"
                        }`}
                      >
                        <e.icon className="h-5 w-5 shrink-0 text-brand-300" />
                        <div>
                          <p className="text-sm font-semibold">{e.label}</p>
                          <p className="text-xs text-ink-400">{e.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) setFileName(f.name);
                    }}
                    className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                      fileName ? "border-emerald-400/60 bg-emerald-500/10" : dragging ? "border-brand-400 bg-brand-500/10" : "border-white/15 bg-white/5 hover:border-white/30"
                    }`}
                    onClick={() => setFileName("resume.pdf")}
                  >
                    {fileName ? (
                      <>
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                          <Check className="h-7 w-7" />
                        </span>
                        <p className="mt-4 text-sm font-semibold text-white">{fileName}</p>
                        <p className="mt-1 text-xs text-ink-400">Click or drop to replace</p>
                      </>
                    ) : (
                      <>
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-ink-200">
                          <UploadCloud className="h-7 w-7" />
                        </span>
                        <p className="mt-4 text-sm font-semibold text-white">Drop resume or click to browse</p>
                        <p className="mt-1 text-xs text-ink-400">PDF, DOCX — processed privately</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-ink-200 transition hover:bg-white/10 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < stepMeta.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-brand-50"
              >
                Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={!canNext}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/40 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start my analysis <Target className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-500">
          <Clock className="h-3 w-3" /> Takes ~60 seconds · your answers customize everything
        </p>
      </motion.div>
    </div>
  );
}
