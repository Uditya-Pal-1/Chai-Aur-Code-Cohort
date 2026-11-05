import { ArrowUpRight, CircleCheck, Sparkles } from 'lucide-react'

export default function BorderBeamCardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[conic-gradient(from_0deg,transparent_0_70%,#fb923c_82%,#fef3c7_87%,transparent_100%)] p-px motion-reduce:animate-none [animation:spin_7s_linear_infinite]">
      <article className="relative overflow-hidden rounded-[15px] bg-zinc-950 p-5 text-zinc-100 sm:p-6">
        <div className="absolute -right-14 -top-20 size-48 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-xl border border-orange-300/20 bg-orange-300/10 text-orange-200"><Sparkles size={18} aria-hidden="true" /></span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-200"><CircleCheck size={12} aria-hidden="true" /> All systems ready</span>
        </div>
        <p className="relative mb-1 mt-7 text-xs uppercase tracking-[0.18em] text-zinc-500">Workspace overview</p>
        <h3 className="relative m-0 text-xl font-semibold tracking-tight">Ship something thoughtful.</h3>
        <p className="relative mb-0 mt-2 text-sm leading-6 text-zinc-400">A quiet highlight brings attention to the state that matters.</p>
        <button className="relative mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-300 px-3.5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-orange-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200" type="button">
          Open workspace <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </article>
    </div>
  )
}
