import type { ReactNode } from 'react'

export default function SectionHeading({ eyebrow, title, sub, center = true, dark = false }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${dark ? 'border-white/15 text-white/60' : 'border-line text-muted bg-white'}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-coral" />{eyebrow}
      </span>
      <h2 className={`mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] ${dark ? 'text-white' : ''}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${dark ? 'text-white/60' : 'text-muted'}`}>{sub}</p>}
    </div>
  )
}
