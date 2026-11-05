import { motion, useReducedMotion } from 'framer-motion'
import { House, Search, Settings, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'

export type MotionEffect =
  | 'shimmer-button'
  | 'glow-card'
  | 'text-reveal'
  | 'spotlight-card'
  | 'magnetic-button'
  | 'tilt-card'
  | 'parallax-stack'
  | 'gradient-border'
  | 'orbit-icons'
  | 'marquee-text'
  | 'blur-fade'
  | 'spring-badge'
  | 'ripple-button'
  | 'floating-dock'
  | 'beam-path'
  | 'skeleton-shimmer'
  | 'counter-up'
  | 'typewriter'
  | 'animated-tabs'
  | 'confetti-burst'

const titles: Record<MotionEffect, string> = {
  'shimmer-button': 'Shimmer Button',
  'glow-card': 'Cursor Glow Card',
  'text-reveal': 'Text Reveal',
  'spotlight-card': 'Spotlight Card',
  'magnetic-button': 'Magnetic Button',
  'tilt-card': '3D Tilt Card',
  'parallax-stack': 'Parallax Stack',
  'gradient-border': 'Gradient Border',
  'orbit-icons': 'Orbiting Marks',
  'marquee-text': 'Marquee Strip',
  'blur-fade': 'Blur Fade',
  'spring-badge': 'Spring Badge',
  'ripple-button': 'Ripple Button',
  'floating-dock': 'Floating Dock',
  'beam-path': 'Beam Path',
  'skeleton-shimmer': 'Skeleton Shimmer',
  'counter-up': 'Count Up',
  typewriter: 'Typewriter',
  'animated-tabs': 'Animated Tabs',
  'confetti-burst': 'Confetti Burst',
}

export default function MotionShowcasePreview({
  effect = 'shimmer-button',
}: {
  effect?: MotionEffect
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [count, setCount] = useState(42)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [confetti, setConfetti] = useState<number[]>([])
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 18 }
  const card = 'rounded-2xl border border-white/10 bg-zinc-900/80 p-6 text-center shadow-xl'

  const demos: Record<MotionEffect, ReactNode> = {
    'shimmer-button': (
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative overflow-hidden rounded-xl bg-orange-400 px-6 py-3 font-semibold text-zinc-950"
      >
        <motion.span
          className="absolute inset-y-0 w-12 bg-white/50 blur-md"
          animate={reduceMotion ? {} : { x: ['-60px', '260px'] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'linear' }}
        />{' '}
        <span className="relative">Get started ↗</span>
      </motion.button>
    ),
    'glow-card': (
      <motion.div
        whileHover={{ y: -7 }}
        className={`${card} bg-[radial-gradient(circle_at_50%_0%,rgba(251,146,60,.22),transparent_60%),#18181b]`}
      >
        <span className="text-3xl">✦</span>
        <h4 className="mt-3 mb-1 text-lg font-semibold">A little extra light</h4>
        <p className="m-0 text-sm text-zinc-400">Hover to lift the surface.</p>
      </motion.div>
    ),
    'text-reveal': (
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="m-0 text-2xl font-semibold tracking-tight"
      >
        Interfaces with <span className="text-orange-300">intention.</span>
      </motion.p>
    ),
    'spotlight-card': (
      <motion.div whileHover={{ scale: 1.025 }} className={`${card} border-orange-300/20`}>
        <span className="text-xs tracking-[.2em] text-orange-300 uppercase">Featured</span>
        <h4 className="mt-3 mb-0 text-xl font-semibold">A focused idea</h4>
        <p className="mt-2 mb-0 text-sm text-zinc-400">
          A soft spotlight creates a clear point of interest.
        </p>
      </motion.div>
    ),
    'magnetic-button': (
      <motion.button
        onPointerMove={(event) => {
          if (reduceMotion) return
          const rect = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.12}px, ${(event.clientY - rect.top - rect.height / 2) * 0.16}px)`
        }}
        onPointerLeave={(event) => { event.currentTarget.style.transform = 'translate(0, 0)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition-transform"
      >
        Move with me ↗
      </motion.button>
    ),
    'tilt-card': (
      <motion.div
        whileHover={{ rotateX: 8, rotateY: -10, y: -5 }}
        transition={transition}
        style={{ perspective: 600 }}
        className={card}
      >
        <span className="text-3xl">◈</span>
        <h4 className="mt-2 mb-0 font-semibold">A new perspective</h4>
      </motion.div>
    ),
    'parallax-stack': (
      <div className="relative h-28 w-40">
        <motion.div
          animate={reduceMotion ? {} : { y: [0, -9, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-x-1 top-1 h-20 rounded-xl border border-white/10 bg-zinc-800"
        />
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.3 }}
          className="absolute inset-x-5 top-7 grid h-20 place-items-center rounded-xl border border-orange-300/30 bg-zinc-900 text-orange-200"
        >
          Layers
        </motion.div>
      </div>
    ),
    'gradient-border': (
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="rounded-2xl bg-[linear-gradient(120deg,#fb923c,#e879f9,#38bdf8)] p-px"
      >
        <div className={`${card} border-0`}>Color in motion</div>
      </motion.div>
    ),
    'orbit-icons': (
      <div className="relative grid size-32 place-items-center rounded-full border border-white/10 text-orange-200">
        <span className="text-2xl">✦</span>
        <motion.span
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 rounded-full border border-dashed border-orange-200/30"
        >
          <i className="absolute -top-1 left-1/2 size-3 rounded-full bg-orange-300" />
        </motion.span>
      </div>
    ),
    'marquee-text': (
      <div className="w-full overflow-hidden border-y border-white/10 py-3 text-sm text-zinc-300">
        <motion.div
          className="whitespace-nowrap"
          animate={reduceMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        >
          BUILD WITH INTENTION · SHIP WITH CLARITY · BUILD WITH INTENTION · SHIP WITH CLARITY ·{' '}
        </motion.div>
      </div>
    ),
    'blur-fade': (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, filter: 'blur(12px)', y: 8 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={transition}
        className="text-xl font-medium"
      >
        Clarity comes into focus.
      </motion.div>
    ),
    'spring-badge': (
      <motion.span
        animate={reduceMotion ? {} : { y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, repeatDelay: 0.6 }}
        className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200"
      >
        ● All systems ready
      </motion.span>
    ),
    'ripple-button': (
      <motion.button
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const id = Date.now()
          setRipples((items) => [...items, { id, x: event.clientX - bounds.left, y: event.clientY - bounds.top }])
          window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== id)), 650)
        }}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden rounded-xl bg-orange-400 px-5 py-3 font-semibold text-zinc-950"
      >
        Tap to ripple
        {ripples.map((ripple) => <motion.span key={ripple.id} initial={{ scale: 0, opacity: 0.45 }} animate={{ scale: 8, opacity: 0 }} transition={{ duration: 0.6 }} className="pointer-events-none absolute size-5 rounded-full bg-white" style={{ left: ripple.x - 10, top: ripple.y - 10 }} />)}
      </motion.button>
    ),
    'floating-dock': (
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-zinc-900/85 p-2">
        {[House, Search, Sparkles, Settings].map((Icon, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={['Home', 'Search', 'Assistant', 'Settings'][i]}
            whileHover={{ y: -7, scale: 1.12 }}
            className={`grid size-11 place-items-center rounded-xl text-lg ${i === 2 ? 'bg-orange-300 text-zinc-950' : 'bg-white/5 text-zinc-300'}`}
          >
            <Icon size={17} aria-hidden="true" />
          </motion.button>
        ))}
      </div>
    ),
    'beam-path': (
      <div className="relative h-1 w-48 rounded-full bg-white/10">
        <motion.i
          animate={reduceMotion ? {} : { x: [0, 176, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 grid size-3 rounded-full bg-orange-300 shadow-[0_0_16px_4px_rgba(251,146,60,.55)]"
        />
      </div>
    ),
    'skeleton-shimmer': (
      <div className="w-56 space-y-3">
        <motion.div
          animate={reduceMotion ? {} : { opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 1.3, repeat: Infinity }}
          className="h-4 rounded bg-white/15"
        />
        <motion.div
          animate={reduceMotion ? {} : { opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 1.3, repeat: Infinity, delay: 0.15 }}
          className="h-3 w-3/4 rounded bg-white/10"
        />
        <div className="h-16 rounded-xl bg-white/5" />
      </div>
    ),
    'counter-up': (
      <button type="button" onClick={() => setCount((value) => value + 1)} className="text-center">
        <motion.strong
          key={count}
          initial={reduceMotion ? false : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="block text-4xl tabular-nums"
        >
          {count}
        </motion.strong>
        <span className="text-xs text-zinc-400">click to count</span>
      </button>
    ),
    typewriter: (
      <p key="typed" className={`typewriter-demo m-0 max-w-full overflow-hidden border-r border-orange-300 pr-1 font-mono text-sm whitespace-nowrap ${reduceMotion ? 'is-static' : ''}`}>
        Design is how it works.
      </p>
    ),
    'animated-tabs': (
      <div className="flex rounded-xl border border-white/10 bg-zinc-900 p-1">
        {['Design', 'Build', 'Ship'].map((tab, i) => (
          <button
            onClick={() => setActiveTab(i)}
            className={`relative rounded-lg px-3 py-2 text-xs ${activeTab === i ? 'bg-orange-300 text-zinc-950' : 'text-zinc-400'}`}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
    ),
    'confetti-burst': (
      <div className="relative">
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => { setConfetti(Array.from({ length: 14 }, (_, index) => index)); window.setTimeout(() => setConfetti([]), 900) }}
        className="rounded-xl border border-orange-300/30 bg-orange-300/10 px-5 py-3 text-orange-100"
      >
        Celebrate ✨
      </motion.button>
      {!reduceMotion && confetti.map((particle) => <motion.i key={particle} initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }} animate={{ x: Math.cos(particle / 14 * Math.PI * 2) * 95, y: Math.sin(particle / 14 * Math.PI * 2) * 75, opacity: 0, rotate: 180 + particle * 25 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="pointer-events-none absolute left-1/2 top-1/2 size-2 rounded-sm bg-orange-300" style={{ backgroundColor: ['#fdba74', '#f9a8d4', '#86efac', '#93c5fd'][particle % 4] }} />)}
      </div>
    ),
  }

  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-6 text-zinc-100">
      <span className="self-start font-mono text-[10px] tracking-[.18em] text-zinc-500 uppercase">
        {titles[effect]} · motion study
      </span>
      <div className="flex min-h-28 w-full items-center justify-center">{demos[effect]}</div>
      <span className="self-end text-[10px] text-zinc-600">Respects reduced motion</span>
    </div>
  )
}
