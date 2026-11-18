import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { LogoStrip, HowItWorks, Features, Story, StatsBand, Roles, Testimonials, CTA, Footer, } from "@/components/Sections";
export default function Home() {
    return (<>
      <Navbar />
      <main>
        <Hero />
        <Reveal><LogoStrip /></Reveal>
        <Reveal><HowItWorks /></Reveal>
        <Reveal><Story /></Reveal>
        <Reveal><StatsBand /></Reveal>
        <Reveal><Features /></Reveal>
        <Reveal><Roles /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><Pricing /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
    </>);
}
