export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/favicon.svg" alt="" className="h-7 w-7" />
      <span className={`text-[19px] font-semibold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>Agentico</span>
    </span>
  )
}
