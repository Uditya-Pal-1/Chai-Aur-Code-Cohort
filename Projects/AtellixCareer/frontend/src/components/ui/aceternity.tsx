"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

/* ============ Background Beams (aceternity-style) ============ */

export function BackgroundBeams({ className = "" }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197c0 0 664 875 684 875",
    "M-392 -197c0 0 684 875 684 875",
    "M-400 -200c0 0 400 400 400 400s200 275 284 475",
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute left-1/2 top-0 h-[64rem] w-[150rem] -translate-x-1/2"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background beams</title>
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p}
            stroke="url(#beam-grad)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            initial={{ pathLength: 0.3, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
            transition={{
              pathLength: { duration: 3 + i, repeat: Infinity, repeatType: "loop" },
              opacity: { duration: 3 + i, repeat: Infinity, repeatType: "loop" },
              delay: i * 0.8,
            }}
          />
        ))}
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6a5cf0" stopOpacity="0" />
            <stop offset="50%" stopColor="#a3a5fb" />
            <stop offset="100%" stopColor="#f0abfc" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ============ Moving Border Button ============ */

export function MovingBorderButton({
  children,
  className = "",
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/20 ${className}`}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <motion.span
          className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0_340deg,#6a5cf0_360deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ width: "200%", height: "200%", left: "-50%", top: "-50%" }}
        />
      </span>
      <span className="absolute inset-[1.5px] rounded-full bg-ink-950" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

/* ============ Bento Grid ============ */

export function BentoGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3 ${className}`}>{children}</div>;
}

export function BentoCard({
  name,
  description,
  icon,
  className = "",
  visual,
}: {
  name: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  visual?: ReactNode;
}) {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 transition duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-200 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:scale-110">
          {icon}
        </div>
        <h3 className="font-display text-lg font-bold text-ink-950">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
      </div>
      {visual && <div className="relative mt-4">{visual}</div>}
    </div>
  );
}

/* ============ Animated Text (typewriter-ish) ============ */

export function TextGenerate({ words, className = "" }: { words: string; className?: string }) {
  const wordsArr = words.split(" ");
  return (
    <span className={className}>
      {wordsArr.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.15 * i }}
        >
          {w}{" "}
        </motion.span>
      ))}
    </span>
  );
}

/* ============ Glowing card wrapper ============ */

export function GlowingCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  const rx = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const ry = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-400/40 via-transparent to-fuchsia-400/30 opacity-0 transition duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

/* ============ Animated presence helper ============ */

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
