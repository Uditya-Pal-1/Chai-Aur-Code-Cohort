import { motion, useReducedMotion } from 'framer-motion'
import { Layers, MousePointer2, Palette, Sparkles } from 'lucide-react'

const principles = [
  {
    title: 'Start from a shared foundation.',
    description: 'Keep color, spacing, and type decisions consistent with reusable design tokens.',
    icon: Palette,
    label: 'DESIGN TOKENS',
    variant: 'testimonial-card--feature',
  },
  {
    title: 'Explore before you adapt.',
    description: 'Try component states in context and inspect the React source as you work.',
    icon: MousePointer2,
    label: 'INTERACTIVE EXAMPLES',
    variant: 'testimonial-card--top',
  },
  {
    title: 'Build with useful patterns.',
    description: 'Browse practical examples for forms, navigation, data, and everyday product flows.',
    icon: Layers,
    label: 'COMPONENT LIBRARY',
    variant: 'testimonial-card--bottom',
  },
]

export default function TestimonialCarousel() {
  const shouldReduceMotion = useReducedMotion() ?? false

  return (
    <section className="testimonial-carousel" aria-labelledby="testimonial-title">
      <div className="testimonial-fabric" aria-hidden="true" />
      <div className="wrap testimonial-inner">
        <header className="testimonial-heading">
          <span className="eyebrow">DESIGNED TO WORK TOGETHER</span>
          <h2 id="testimonial-title">Good systems make better work.</h2>
          <p>A practical foundation for moving from design decisions to working interfaces.</p>
        </header>

        <div className="testimonial-grid">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
            <motion.article
              className={`testimonial-card ${principle.variant}`}
              key={principle.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={shouldReduceMotion ? undefined : { y: -7, rotateX: 3, rotateY: index === 1 ? -3 : 3 }}
              style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
            >
              <span className="eyebrow">{principle.label}</span>
              <span className="testimonial-quote-icon"><Icon size={20} aria-hidden="true" /></span>
              <blockquote>{principle.title}</blockquote>
              <div className="testimonial-person">
                <span>{principle.description}</span>
              </div>
            </motion.article>
          )})}

          <motion.article
            className="testimonial-card testimonial-card--manifesto"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            whileHover={shouldReduceMotion ? undefined : { y: -7, rotateX: -2, rotateY: -3 }}
            style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
          >
            <Sparkles size={22} aria-hidden="true" />
            <span className="eyebrow">THE ATELLIX APPROACH</span>
            <h3>Less drift.<br /><em>More direction.</em></h3>
            <p>A shared visual language helps teams spend less time rebuilding patterns and more time shaping the product.</p>
            <div className="testimonial-manifesto-tags"><span>Tokens</span><span>Components</span><span>Craft</span></div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
