import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { CTA, Footer } from "@/components/Sections";
import { BackgroundBeams } from "@/components/ui/aceternity";
import { ShieldCheck, RefreshCcw, Lock } from "lucide-react";
export const metadata = { title: "Pricing — AtellixCareer" };
export default function PricingPage() {
    return (<>
      <Navbar />
      <main>
        {/* header */}
        <section className="relative overflow-hidden pb-8 pt-36">
          <BackgroundBeams />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Pricing</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
              Simple plans, honest limits
            </h1>
            <p className="mt-4 text-lg text-ink-600">
              Start with a full gap analysis for free. Upgrade when you're ready to go all in.
            </p>
          </div>
        </section>

        <Reveal><Pricing /></Reveal>

        {/* trust strip */}
        <section className="pb-24">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            {[
            { icon: ShieldCheck, title: "Cancel anytime", body: "No contracts, no lock-in. Your plans and data export stay yours." },
            { icon: RefreshCcw, title: "Re-analyze free", body: "Your resume changes — your plan should too. Re-run analyses as you grow." },
            { icon: Lock, title: "Privacy included", body: "Encrypted storage and deletion on demand on every plan, including Free." },
        ].map((t) => (<div key={t.title} className="rounded-2xl border border-ink-100 bg-ink-50/50 p-6 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100">
                  <t.icon className="h-5 w-5"/>
                </span>
                <h3 className="mt-4 font-display font-bold text-ink-950">{t.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{t.body}</p>
              </div>))}
          </div>
        </section>

        <Reveal><FAQ /></Reveal>
        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
    </>);
}
