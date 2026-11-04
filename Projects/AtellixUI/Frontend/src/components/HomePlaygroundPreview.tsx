import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Code2, Copy, Monitor, RotateCcw, Smartphone, Sparkles } from 'lucide-react'

type PlaygroundComponent = 'Button' | 'Card' | 'Badge' | 'Switch' | 'Input'
type Variant = 'Solid' | 'Outline' | 'Soft' | 'Ghost'

export default function HomePlaygroundPreview({ onNavigate }: { onNavigate: () => void }) {
  const [component, setComponent] = useState<PlaygroundComponent>('Button')
  const [variant, setVariant] = useState<Variant>('Solid')
  const [radius, setRadius] = useState(12)
  const [glow, setGlow] = useState(true)
  const [previewSize, setPreviewSize] = useState<'desktop' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [switchOn, setSwitchOn] = useState(true)

  const components: PlaygroundComponent[] = ['Button', 'Card', 'Badge', 'Switch', 'Input']
  const variants: Variant[] = ['Solid', 'Outline', 'Soft', 'Ghost']

  const getCodeSnippet = () => {
    const shadow = glow ? `\n  boxShadow: '0 8px 24px rgba(255, 138, 61, 0.25)',` : ''
    if (component === 'Button') {
      return `<button\n  type="button"\n  style={{\n    borderRadius: '${radius}px',${shadow}\n    padding: '10px 20px',\n    fontWeight: 700,\n  }}\n  className="atellix-btn-${variant.toLowerCase()}"\n>\n  Explore AtellixUI ↗\n</button>`
    }
    if (component === 'Card') {
      return `<article\n  style={{\n    borderRadius: '${radius}px',${shadow}\n    padding: '24px',\n  }}\n  className="atellix-card-${variant.toLowerCase()}"\n>\n  <span className="eyebrow">ATELLIX / UI</span>\n  <h4>Thoughtful Interface</h4>\n  <p>Engineered for high-scale products.</p>\n</article>`
    }
    if (component === 'Badge') {
      return `<span\n  style={{ borderRadius: '${radius}px' }}\n  className="atellix-badge-${variant.toLowerCase()}"\n>\n  ● Production Ready\n</span>`
    }
    if (component === 'Switch') {
      return `<label className="atellix-switch">\n  <input type="checkbox" role="switch" defaultChecked />\n  <span style={{ borderRadius: '${radius}px' }} />\n</label>`
    }
    return `<input\n  type="text"\n  placeholder="Enter component name..."\n  style={{ borderRadius: '${radius}px' }}\n  className="atellix-input-${variant.toLowerCase()}"\n/>`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCodeSnippet())
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const reset = () => {
    setComponent('Button')
    setVariant('Solid')
    setRadius(12)
    setGlow(true)
    setClicks(0)
  }

  return (
    <div className="home-playground-studio">
      <div className="home-playground-grid">
        {/* Left Workbench Controls */}
        <div className="home-playground-controls">
          <div className="home-playground-ctrl-group">
            <span className="demo-control-label">SELECT COMPONENT</span>
            <div className="home-ctrl-pills" role="group" aria-label="Component selector">
              {components.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={component === item ? 'is-active' : ''}
                  aria-pressed={component === item}
                  onClick={() => setComponent(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="home-playground-ctrl-group">
            <span className="demo-control-label">VARIANT STYLE</span>
            <div className="home-ctrl-pills" role="group" aria-label="Variant selector">
              {variants.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={variant === item ? 'is-active' : ''}
                  aria-pressed={variant === item}
                  onClick={() => setVariant(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="home-playground-ctrl-group">
            <div className="home-slider-label-row">
              <span className="demo-control-label">CORNER RADIUS</span>
              <strong className="mono">{radius}px</strong>
            </div>
            <input
              type="range"
              min="0"
              max="28"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="demo-range-slider"
              aria-label="Adjust corner radius"
            />
          </div>

          <div className="home-playground-ctrl-group home-toggle-line">
            <div>
              <span className="demo-control-label">AMBIENT GLOW</span>
              <small>Warm radiant orange shadow</small>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={glow}
              className={`demo-icon-toggle ${glow ? 'is-checked' : ''}`}
              onClick={() => setGlow(!glow)}
              aria-label="Toggle ambient glow"
            >
              <span className="demo-toggle-thumb" />
            </button>
          </div>

          <div className="home-ctrl-footer-row">
            <button type="button" className="demo-button demo-button-subtle" onClick={reset}>
              <RotateCcw size={13} /> Reset
            </button>
            <button type="button" className="demo-button demo-button-primary" onClick={onNavigate}>
              Open Full Studio ↗
            </button>
          </div>
        </div>

        {/* Right DaisyUI Window Mockup Stage */}
        <div className="home-playground-stage-wrapper">
          <div className="daisy-window-mockup">
            <div className="daisy-window-header">
              <div className="daisy-window-dots" aria-hidden="true">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <div className="daisy-window-address">
                <span className="mono">atellix-preview.tsx</span>
              </div>
              <div className="daisy-window-devices">
                <button
                  type="button"
                  className={`demo-icon-button ${previewSize === 'desktop' ? 'is-starred' : ''}`}
                  onClick={() => setPreviewSize('desktop')}
                  title="Desktop preview"
                  aria-label="Desktop view"
                >
                  <Monitor size={14} />
                </button>
                <button
                  type="button"
                  className={`demo-icon-button ${previewSize === 'mobile' ? 'is-starred' : ''}`}
                  onClick={() => setPreviewSize('mobile')}
                  title="Mobile preview"
                  aria-label="Mobile view"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            <div className={`daisy-window-body ${previewSize === 'mobile' ? 'is-mobile-frame' : ''}`}>
              {!showCode ? (
                <div className="daisy-window-canvas">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${component}-${variant}-${radius}-${glow}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.18 }}
                      className="daisy-rendered-component"
                    >
                      {component === 'Button' && (
                        <button
                          type="button"
                          className={`home-preview-btn variant-${variant.toLowerCase()}`}
                          style={{
                            borderRadius: `${radius}px`,
                            boxShadow: glow ? '0 8px 24px rgba(255, 138, 61, 0.28)' : 'none',
                          }}
                          onClick={() => setClicks((c) => c + 1)}
                        >
                          <Sparkles size={16} />
                          <span>Interactive Button</span>
                          <span aria-hidden="true">↗</span>
                        </button>
                      )}

                      {component === 'Card' && (
                        <article
                          className={`home-preview-card variant-${variant.toLowerCase()}`}
                          style={{
                            borderRadius: `${radius}px`,
                            boxShadow: glow ? '0 10px 30px rgba(255, 138, 61, 0.2)' : 'none',
                          }}
                          onClick={() => setClicks((c) => c + 1)}
                        >
                          <span className="eyebrow">ATELLIX / WORKSPACE</span>
                          <h4>Considered Architecture</h4>
                          <p>
                            Pre-configured token system with responsive Tailwind styles and zero runtime friction.
                          </p>
                          <div className="home-preview-card-action">Explore Component ↗</div>
                        </article>
                      )}

                      {component === 'Badge' && (
                        <span
                          className={`home-preview-badge variant-${variant.toLowerCase()}`}
                          style={{
                            borderRadius: `${radius}px`,
                            boxShadow: glow ? '0 4px 16px rgba(255, 138, 61, 0.22)' : 'none',
                          }}
                          onClick={() => setClicks((c) => c + 1)}
                        >
                          <i aria-hidden="true" /> Atellix Production Ready
                        </span>
                      )}

                      {component === 'Switch' && (
                        <label className="home-preview-switch">
                          <input
                            type="checkbox"
                            checked={switchOn}
                            onChange={(e) => setSwitchOn(e.target.checked)}
                          />
                          <span
                            className="home-preview-switch-track"
                            style={{ borderRadius: `${radius > 14 ? 999 : radius}px` }}
                          >
                            <i />
                          </span>
                          <span>{switchOn ? 'Feature Enabled' : 'Feature Disabled'}</span>
                        </label>
                      )}

                      {component === 'Input' && (
                        <div className="home-preview-input-wrap">
                          <label>COMPONENT SPECIFIER</label>
                          <input
                            type="text"
                            defaultValue="Button.Primary.Shimmer"
                            className={`variant-${variant.toLowerCase()}`}
                            style={{ borderRadius: `${radius}px` }}
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {clicks > 0 && (
                    <div className="daisy-interaction-feedback" role="status">
                      ✓ Triggered {clicks} interaction{clicks > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ) : (
                <pre className="daisy-code-block">
                  <code>{getCodeSnippet()}</code>
                </pre>
              )}
            </div>

            <div className="daisy-window-footer">
              <div className="daisy-footer-tabs">
                <button
                  type="button"
                  className={!showCode ? 'is-active' : ''}
                  onClick={() => setShowCode(false)}
                >
                  <Monitor size={13} /> Live Preview
                </button>
                <button
                  type="button"
                  className={showCode ? 'is-active' : ''}
                  onClick={() => setShowCode(true)}
                >
                  <Code2 size={13} /> Copyable JSX
                </button>
              </div>

              <button type="button" className="demo-button demo-button-subtle" onClick={handleCopy}>
                {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Snippet!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
