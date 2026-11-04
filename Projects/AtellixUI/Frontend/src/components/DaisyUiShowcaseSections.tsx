import { useState } from 'react'
import { Check, ChevronDown, Copy, Download, Layers, ShieldCheck, Sparkles, Zap } from 'lucide-react'

export default function DaisyUiShowcaseSections({
  onNavigateToComponents,
  onNavigateToPlayground,
}: {
  onNavigateToComponents: () => void
  onNavigateToPlayground: () => void
}) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [copiedCli, setCopiedCli] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const cliCommand = 'npm run dev'

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand)
      setCopiedCli(true)
      setCopyError(false)
      window.setTimeout(() => setCopiedCli(false), 1800)
    } catch (error) {
      console.error('Unable to copy the development command:', error)
      setCopiedCli(false)
      setCopyError(true)
      window.setTimeout(() => setCopyError(false), 2400)
    }
  }

  const faqs = [
    {
      q: 'What is AtellixUI?',
      a: 'AtellixUI is an evolving frontend prototype for exploring reusable React patterns, theme tokens, and interactive component previews. Use the library and system pages to inspect how the examples work before adapting them.',
    },
    {
      q: 'Are the component examples production-ready?',
      a: 'Treat each example as a starting point, not a blanket accessibility or compliance guarantee. Test keyboard interaction, contrast, and responsive behavior in the context of your own product.',
    },
    {
      q: 'How do I run the project locally?',
      a: 'Install the dependencies with npm install, then start the Vite development server with npm run dev from the Frontend directory.',
    },
    {
      q: 'Is there an AtellixUI package or CLI?',
      a: 'The current project does not publish an AtellixUI package or CLI. The interactive library demonstrates patterns in this repository; check its license and source before reusing code.',
    },
  ]

  return (
    <div className="daisy-showcase-suite">
      {/* 1. Product capabilities */}
      <section className="section-block daisy-kpi-banner-section reveal">
        <div className="wrap">
          <div className="daisy-kpi-grid">
            <div className="daisy-kpi-item">
              <div className="daisy-kpi-icon">
                <Layers size={22} color="#ff8a3d" />
              </div>
              <div className="daisy-kpi-copy">
                <strong>Component library</strong>
                <span>Interactive React examples</span>
              </div>
            </div>

            <div className="daisy-kpi-item">
              <div className="daisy-kpi-icon">
                <Zap size={22} color="#ff8a3d" />
              </div>
              <div className="daisy-kpi-copy">
                <strong>Live playground</strong>
                <span>Adjust component states in context</span>
              </div>
            </div>

            <div className="daisy-kpi-item">
              <div className="daisy-kpi-icon">
                <ShieldCheck size={22} color="#ff8a3d" />
              </div>
              <div className="daisy-kpi-copy">
                <strong>Accessibility tools</strong>
                <span>Contrast feedback and visible focus examples</span>
              </div>
            </div>

            <div className="daisy-kpi-item">
              <div className="daisy-kpi-icon">
                <Download size={22} color="#ff8a3d" />
              </div>
              <div className="daisy-kpi-copy">
                <strong>Design tokens</strong>
                <span>Tune palettes and copy CSS values</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Local development workflow */}
      <section className="section-block daisy-terminal-section reveal">
        <div className="wrap daisy-terminal-layout">
          <div className="daisy-terminal-copy">
            <span className="eyebrow">DEVELOPER WORKFLOW</span>
            <h2>Explore patterns.<br /><em>Shape the source.</em></h2>
            <p className="lead">
              Browse interactive examples, adjust the theme, and inspect the source before adapting a pattern to your product. AtellixUI is an evolving frontend prototype, not a published component package.
            </p>
            <div className="daisy-terminal-features">
              <div className="daisy-t-feat">
                <Sparkles size={16} color="#ff8a3d" />
                <span>Browse component patterns</span>
              </div>
              <div className="daisy-t-feat">
                <Sparkles size={16} color="#ff8a3d" />
                <span>Tune design tokens live</span>
              </div>
              <div className="daisy-t-feat">
                <Sparkles size={16} color="#ff8a3d" />
                <span>Inspect source before adapting</span>
              </div>
            </div>
          </div>

          <div className="daisy-mockup-code-wrap">
            <div className="daisy-mockup-code">
              <div className="daisy-mockup-code-header">
                <div className="daisy-mockup-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="mono daisy-mockup-title">bash — frontend</span>
                <button
                  type="button"
                  className="daisy-code-copy-btn"
                  onClick={copyCli}
                  aria-label="Copy terminal command"
                >
                  {copiedCli ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                  <span>{copiedCli ? 'Copied' : copyError ? 'Clipboard blocked' : 'Copy'}</span>
                </button>
              </div>

              <div className="daisy-mockup-code-body mono">
                <p className="line-cmd">
                  <span className="text-orange-400">$</span> npm install
                </p>
                <p className="line-res text-neutral-400">
                  Install dependencies from package.json
                </p>
                <p className="line-res text-neutral-400">
                  React · TypeScript · Vite
                </p>
                <p className="line-cmd mt-2">
                  <span className="text-orange-400">$</span> {cliCommand}
                </p>
                <p className="line-res text-green-400">
                  Start the local Vite development server
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DaisyUI FAQ Accordion Section */}
      <section className="section-block daisy-faq-section reveal">
        <div className="wrap">
          <div className="text-center mb-6">
            <span className="eyebrow">COMMONLY ASKED QUESTIONS</span>
            <h2>Everything you need to know.</h2>
            <p className="lead" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Clear answers about AtellixUI architecture, distribution models, and design system governance.
            </p>
          </div>

          <div className="daisy-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <article
                  key={faq.q}
                  className={`daisy-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="daisy-faq-trigger"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`daisy-faq-chevron ${isOpen ? 'is-rotated' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="daisy-faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. DaisyUI High-Impact CTA Banner */}
      <section className="section-block daisy-cta-banner-section reveal">
        <div className="wrap">
          <div className="daisy-cta-box">
            <div className="daisy-cta-glow" aria-hidden="true" />
            <span className="eyebrow">START BUILDING TODAY</span>
            <h2>A sharper standard for your next project.</h2>
            <p className="lead">
              Explore live components, tune a theme, and inspect token references before adapting the code to your product.
            </p>
            <div className="daisy-cta-actions">
              <button
                type="button"
                className="btn"
                onClick={onNavigateToComponents}
              >
                Browse components ↗
              </button>
              <button
                type="button"
                className="text-link"
                onClick={onNavigateToPlayground}
              >
                Open Live Playground ↗
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
