"use client";
import { useState } from "react";
export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);
    return done ? (<p className="mt-6 rounded-full bg-emerald-100 px-6 py-3 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200">
      ✓ You're on the list — first issue arrives soon.
    </p>) : (<form className="mx-auto mt-6 flex max-w-sm gap-2" onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@"))
                setDone(true);
        }}>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"/>
      <button className="rounded-full bg-ink-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-ink-800">
        Subscribe
      </button>
    </form>);
}
