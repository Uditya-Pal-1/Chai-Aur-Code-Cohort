import { logos } from '../data'

export default function LogoMarquee() {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="animate-marquee flex w-max gap-14">
        {[...logos, ...logos].map((l, i) => (
          <span key={i} className={`whitespace-nowrap text-2xl text-ink/40 ${i % 3 === 0 ? 'font-serif italic' : i % 3 === 1 ? 'font-semibold tracking-tight' : 'font-mono uppercase text-lg tracking-widest'}`}>{l}</span>
        ))}
      </div>
    </div>
  )
}
