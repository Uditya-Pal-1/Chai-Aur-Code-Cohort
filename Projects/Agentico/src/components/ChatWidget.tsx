import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { faqs } from '../data'

type Msg = { from: 'bot' | 'user'; text: string; cta?: boolean }
const suggestions = ['What can an agent do for us?', 'How much does it cost?', 'How fast can we launch?', 'Is our data safe?']

function answer(q: string): Msg {
  const s = q.toLowerCase()
  const pick = (i: number, cta = false): Msg => ({ from: 'bot', text: faqs[i].a, cta })
  if (/(cost|price|pricing|\$|budget|expensive)/.test(s)) return pick(5, true)
  if (/(fast|long|time|launch|weeks|days)/.test(s)) return pick(1, true)
  if (/(safe|secure|data|privacy|own)/.test(s)) return { from: 'bot', text: faqs[4].a + ' ' + faqs[6].a }
  if (/(tool|integrat|model|openai|salesforce|hubspot)/.test(s)) return pick(3)
  if (/(engineer|developer|technical|team)/.test(s)) return pick(2)
  if (/(what|agent|do|help|use case)/.test(s)) return { from: 'bot', text: 'Our agents handle real work end-to-end: qualifying leads and booking meetings, resolving support tickets, processing orders and invoices, screening candidates and more. Which team do you want to free up first?', cta: true }
  return { from: 'bot', text: 'Great question. A strategist can answer that properly on a free 30-minute audit call. Want to grab a slot?', cta: true }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: 'Hi, I’m Ava, Agentico’s own AI agent Ask me anything about building agents for your business.' }])
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const send = (text: string) => {
    if (!text.trim() || typing) return
    setMsgs(m => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => { setMsgs(m => [...m, answer(text)]); setTyping(false) }, 900)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="animate-fadeup mb-3 flex h-[520px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand"><Sparkles className="h-4 w-4" /></span>
              <div><div className="text-sm font-semibold">Ava · Agentico</div><div className="text-[11px] text-white/60">AI agent · replies instantly</div></div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-paper p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'user' ? 'bg-ink text-white' : 'bg-white border border-line'}`}>
                  {m.text}
                  {m.cta && <Link to="/book" onClick={() => setOpen(false)} className="mt-2 block w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">Book a free audit →</Link>}
                </div>
              </div>
            ))}
            {typing && <div className="w-fit rounded-2xl border border-line bg-white px-4 py-3"><span className="flex gap-1">{[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted" style={{ animation: `blink 1s ${i * 0.15}s infinite` }} />)}</span></div>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map(s => <button key={s} onClick={() => send(s)} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs hover:border-ink">{s}</button>)}
              </div>
            )}
            <div ref={end} />
          </div>
          <form className="flex gap-2 border-t border-line p-3" onSubmit={e => { e.preventDefault(); send(input) }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about agents, pricing, security…" aria-label="Message" className="flex-1 rounded-full bg-paper px-4 text-sm outline-none" />
            <button className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white" aria-label="Send"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="ml-auto flex items-center gap-2 rounded-full bg-ink py-3 pl-4 pr-5 text-sm font-medium text-white shadow-xl hover:bg-ink-2" aria-label="Open chat">
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />} {open ? 'Close' : 'Ask our agent'}
      </button>
    </div>
  )
}
