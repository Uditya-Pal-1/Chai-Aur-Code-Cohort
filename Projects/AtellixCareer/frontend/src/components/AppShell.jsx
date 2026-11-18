"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { LayoutDashboard, Radar, Route, FolderKanban, Settings, LogOut, Bell, Search, } from "lucide-react";
const nav = [
    { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/app/analysis", label: "Gap Analysis", icon: Radar },
    { href: "/app/path", label: "Learning Path", icon: Route },
    { href: "/app/portfolio", label: "Portfolio", icon: FolderKanban },
];
export default function AppShell({ children }) {
    const pathname = usePathname();
    return (<div className="flex min-h-screen bg-ink-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-ink-100 bg-white lg:flex">
        <div className="border-b border-ink-100 px-5 py-3">
          <Logo href="/app"/>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Workspace
          </p>
          {nav.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (<Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active
                    ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"}`}>
                <item.icon className={`h-4.5 w-4.5 ${active ? "text-brand-600" : "text-ink-400"}`}/>
                {item.label}
              </Link>);
        })}

          <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Account
          </p>
          <Link href="/app/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-50 hover:text-ink-900">
            <Settings className="h-4.5 w-4.5 text-ink-400"/>
            Settings
          </Link>
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-50 hover:text-ink-900">
            <LogOut className="h-4.5 w-4.5 text-ink-400"/>
            Exit workspace
          </Link>
        </nav>

        {/* upgrade card — paywall pattern */}
        <div className="p-3">
          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
            <p className="font-display text-sm font-bold">Go Pro</p>
            <p className="mt-1 text-xs leading-relaxed text-brand-100">
              Unlock unlimited analyses, full learning paths & interview scoring.
            </p>
            <Link href="/pricing" className="mt-3 block w-full rounded-lg bg-white/15 py-2 text-center text-xs font-semibold backdrop-blur transition hover:bg-white/25">
              Upgrade — $15/mo
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ink-100 bg-white/85 px-4 backdrop-blur-xl sm:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"/>
            <input type="text" placeholder="Search skills, resources, milestones…" className="w-full rounded-full border border-ink-200 bg-ink-50/60 py-2 pl-9 pr-4 text-sm outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"/>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative rounded-full p-2.5 text-ink-500 transition hover:bg-ink-50 hover:text-ink-800">
              <Bell className="h-5 w-5"/>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"/>
            </button>
            <div className="flex items-center gap-2.5 rounded-full border border-ink-100 py-1 pl-1 pr-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-xs font-bold text-white">
                AP
              </span>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-tight">Aman Pal</p>
                <p className="text-[10px] leading-tight text-ink-400">Pro trial · 9 days left</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="sticky top-16 z-30 flex gap-1 overflow-x-auto border-b border-ink-100 bg-white/90 px-3 py-2 backdrop-blur lg:hidden">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (<Link key={item.href} href={item.href} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${active ? "bg-brand-600 text-white" : "bg-ink-50 text-ink-600"}`}>
                <item.icon className="h-3.5 w-3.5"/>
                {item.label}
              </Link>);
        })}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>);
}
