import { motion, useReducedMotion } from 'framer-motion'
import { Quote, Sparkles, Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'AtellixUI accelerated our product launch by weeks with ready-to-use components.',
    name: 'Jane Doe',
    role: 'Lead Engineer · Acme Corp',
    variant: 'testimonial-card--feature',
  },
  {
    quote: 'The token-first approach gave us consistent design across platforms.',
    name: 'John Smith',
    role: 'UI Architect · BetaTech',
    variant: 'testimonial-card--top',
  },
  {
    quote: 'Zero-runtime CSS overhead means a faster experience for our users.',
    name: 'Maria Lee',
    role: 'Frontend Engineer · Gamma Studios',
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
          <span className="eyebrow">SAMPLE TEAM FEEDBACK</span>
          <h2 id="testimonial-title">Good systems make better work.</h2>
          <p>Thoughtful details, consistent tokens, and a faster path from idea to interface.</p>
          <small className="testimonial-disclaimer">
            Placeholder testimonials for this preview; replace them with verified customer feedback before publishing.
          </small>
        </header>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <motion.article
              className={`testimonial-card ${testimonial.variant}`}
              key={testimonial.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={shouldReduceMotion ? undefined : { y: -7, rotateX: 3, rotateY: index === 1 ? -3 : 3 }}
              style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
            >
              <div className="testimonial-card-top">
                <span className="testimonial-quote-icon"><Quote size={20} aria-hidden="true" /></span>
                <span className="testimonial-stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, star) => <Star size={13} key={star} fill="currentColor" aria-hidden="true" />)}
                </span>
              </div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="testimonial-person">
                <span className="testimonial-avatar" aria-hidden="true">{testimonial.name.split(' ').map((part) => part[0]).join('')}</span>
                <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
              </div>
            </motion.article>
          ))}

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
