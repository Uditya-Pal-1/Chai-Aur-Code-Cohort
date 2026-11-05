import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { to: '/#agents', label: 'Agents' },
  { to: '/#process', label: 'How we work' },
  { to: '/#results', label: 'Results' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled ? 'bg-paper/85 backdrop-blur border-b border-line' : 'bg-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" aria-label="Agentico home" onClick={() => setOpen(false)}><Logo /></Link>
        <div className="hidden items-center gap-8 text-[15px] text-ink-2 md:flex">
          {links.map(l => (
            <NavLink key={l.label} to={l.to} className="hover:text-ink">{l.label}</NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/pricing#roi" className="text-[15px] text-ink-2 hover:text-ink">ROI calculator</Link>
          <Link to="/book" className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink-2">Book a free audit</Link>
        </div>
        <button className="md:hidden p-2" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-line bg-paper px-5 pb-6 md:hidden">
          {links.map(l => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-lg">{l.label}</Link>
          ))}
          <Link to="/book" onClick={() => setOpen(false)} className="mt-5 block rounded-full bg-ink py-3 text-center font-medium text-white">Book a free audit</Link>
        </div>
      )}
    </header>
  )
}
