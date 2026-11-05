import { Link } from 'react-router-dom'
import Logo from './Logo'

const YEAR = new Date().getFullYear()

const cols = [
  { title: 'Agents', items: ['Sales agents', 'Support agents', 'Operations agents', 'Finance agents', 'People agents'] },
  { title: 'Company', items: ['About', 'Careers', 'Partners', 'Press'] },
  { title: 'Resources', items: ['Case studies', 'AI Autonomy Playbook', 'Blog', 'ROI calculator'] },
  { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'DPA'] },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-6">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm">We design, build and run AI agents that do real work for growing businesses.</p>
          <form className="mt-6 flex max-w-sm rounded-full bg-white/10 p-1" onSubmit={e => e.preventDefault()}>
            <input type="email" required placeholder="Get the monthly agent playbook" aria-label="Email" className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 outline-none" />
            <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">Subscribe</button>
          </form>
          <div className="mt-6 flex gap-2">
            {['SOC 2', 'GDPR', 'HIPAA'].map(b => <span key={b} className="rounded-md border border-white/15 px-2 py-1 font-mono text-[10px] tracking-wider">{b}</span>)}
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold text-white">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {c.items.map(i => <li key={i}><Link to={i === 'ROI calculator' ? '/pricing#roi' : '/'} className="hover:text-white">{i}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl select-none px-5 font-serif text-[22vw] leading-[0.8] tracking-tight text-white/[0.04] md:text-[16rem]">Agentico</div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs md:flex-row">
          <span>© {YEAR} Agentico. All rights reserved.</span>
          <span>Built with agents, approved by humans.</span>
        </div>
      </div>
    </footer>
  )
}
