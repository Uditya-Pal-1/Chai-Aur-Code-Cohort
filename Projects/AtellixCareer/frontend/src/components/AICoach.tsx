"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { skills, learningPath, targetRole } from "@/lib/data";

interface Msg {
  role: "user" | "ai";
  text: string;
}

function respond(input: string): string {
  const q = input.toLowerCase();
  const currentWeek = learningPath.find((w) => w.status === "current");
  const topGap = [...skills].filter((s) => s.status === "gap").sort((a, b) => (b.target - b.current) - (a.target - a.current))[0];

  if (q.includes("gap") || q.includes("weak") || q.includes("improve")) {
    return `Your biggest gap is **${topGap.name}** (${topGap.current} → target ${topGap.target}). Week ${currentWeek?.week} of your path targets it directly — finish the "${currentWeek?.theme}" module and you'll close roughly half the distance. Want me to suggest a faster resource swap?`;
  }
  if (q.includes("week") || q.includes("today") || q.includes("do")) {
    return `This week (W${currentWeek?.week}): **${currentWeek?.theme}** — ${currentWeek?.focus}. Budget ~${currentWeek?.hours}h. Highest-leverage item: the ${currentWeek?.resources[0]?.type.toLowerCase()} "${currentWeek?.resources[0]?.title}". Consistency beats intensity — 45 focused minutes daily compounds.`;
  }
  if (q.includes("interview") || q.includes("ready") || q.includes("job")) {
    return `Readiness for ${targetRole.title} is **${targetRole.matchScore}%**. Interviews typically probe your 3 weakest evidenced areas first — right now that's System Design, CI/CD, and GraphQL. I'd prioritize the Week 4 testing module next; it converts directly into "tells me about a test you wrote" stories.`;
  }
  if (q.includes("resource") || q.includes("course") || q.includes("learn")) {
    return `For ${topGap.name}, the evidence says structured projects beat passive courses. Try: (1) the docs deep-dive listed in your path, (2) rebuild a feature you already know using the new approach, (3) write a 5-line case note — that note becomes interview material later.`;
  }
  if (q.includes("motivat") || q.includes("behind") || q.includes("stuck")) {
    return `You're at week ${currentWeek?.week} of ${learningPath.length} with a ${learningPath.filter((w) => w.status === "done").length}-week head start banked. Skill mastery compounds non-linearly — most people see the biggest jumps in weeks 3–5 as patterns connect. Reduce scope, not consistency: one module done beats three half-done.`;
  }
  return `I can help with your path, gaps, resources, or interview readiness. Some things to try: "what should I focus on this week?", "what's my biggest gap?", or "am I interview ready for ${targetRole.title}?"`;
}

const starters = [
  "What's my biggest gap?",
  "What should I do this week?",
  "Am I interview ready?",
];

export default function AICoach() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: `Hi! I'm your AtellixCareer coach. I can see your ${targetRole.title} path — ask me anything about gaps, weeks, or interview readiness.` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: respond(t) }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-2xl shadow-brand-600/40"
        aria-label="AI coach"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-2xl shadow-ink-900/20"
          >
            <div className="flex items-center gap-3 border-b border-ink-100 bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-3.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-sm font-bold">Atellix AI Coach</p>
                <p className="text-[11px] text-brand-100">Online · knows your full plan</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-ink-50/60 p-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-brand-600 text-white"
                        : "rounded-bl-md border border-ink-100 bg-white text-ink-800 shadow-sm"
                    }`}
                  >
                    {m.text.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                      part.startsWith("**") ? (
                        <b key={j} className={m.role === "user" ? "text-white" : "text-brand-700"}>{part.slice(2, -2)}</b>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-ink-100 bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-brand-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {msgs.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {starters.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-ink-100 bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your plan…"
                className="flex-1 rounded-full border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-sm outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
