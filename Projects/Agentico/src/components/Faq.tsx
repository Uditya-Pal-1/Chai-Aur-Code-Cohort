import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((f, i) => (
        <div key={f.q}>
          <button className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-medium" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {f.q}
            <Plus className={`h-5 w-5 shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`} />
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden"><p className="px-6 pb-6 text-muted">{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}
