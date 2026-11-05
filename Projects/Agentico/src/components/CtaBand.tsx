import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CtaBand() {
  return (
    <section className="px-5 py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-center text-white">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Your first AI agent, <span className="whitespace-nowrap font-serif italic font-normal">live in 21 days.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">Start with a free 30-minute audit. We’ll map your top three automation opportunities and the ROI of each.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-ink hover:bg-white/90">Book a free audit <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/pricing" className="rounded-full border border-white/25 px-6 py-3 font-medium hover:bg-white/10">See pricing</Link>
          </div>
          <p className="mt-5 text-sm text-white/50">No commitment · Fixed-fee pilots · You own the agent</p>
        </div>
      </div>
    </section>
  )
}
