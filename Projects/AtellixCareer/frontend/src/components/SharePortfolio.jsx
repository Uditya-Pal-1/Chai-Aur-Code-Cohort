"use client";
import { useState } from "react";
import { Link2, Check, Globe, Eye } from "lucide-react";
export default function SharePortfolio() {
    const [copied, setCopied] = useState(false);
    const url = "atellixcareer.com/p/aman-pal";
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(`https://${url}`);
        }
        catch (_a) {
            /* clipboard unavailable */
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };
    return (<div className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-gradient-to-r from-ink-900 to-ink-800 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Globe className="h-5 w-5"/>
        </span>
        <div>
          <p className="text-sm font-bold">Public portfolio ready to share</p>
          <p className="text-xs text-ink-300">Employers see verified milestones — not just claims.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-ink-200 ring-1 ring-white/15">
          <Eye className="h-3.5 w-3.5"/> {url}
        </div>
        <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-ink-900 transition hover:bg-brand-50">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600"/> : <Link2 className="h-3.5 w-3.5"/>}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>);
}
