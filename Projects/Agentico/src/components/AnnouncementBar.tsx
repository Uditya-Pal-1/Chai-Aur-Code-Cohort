import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-white text-sm">
      <Link to="/book" className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 hover:text-white/80">
        <span className="rounded-full bg-gradient-brand px-2 py-0.5 text-[11px] font-semibold">NEW</span>
        <span className="truncate">Free 30-minute AI Opportunity Audit: find your top 3 automations</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </div>
  )
}
