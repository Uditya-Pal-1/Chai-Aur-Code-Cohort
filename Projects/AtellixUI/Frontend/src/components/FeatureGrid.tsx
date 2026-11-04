import { Layers, Zap, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FeatureGrid() {
  const features = [
    { icon: Layers, title: '67 Primitives', desc: 'Production UI components' },
    { icon: Zap, title: '< 8ms Latency', desc: 'Zero runtime CSS overhead' },
    { icon: ShieldCheck, title: 'WCAG 2.1 AA', desc: '100% accessible primitives' },
  ]

  return (
    <section className="section-block feature-grid bg-base-200 py-12">
      <div className="wrap mx-auto max-w-5xl px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              className="p-6 bg-base-100 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <f.icon size={28} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

