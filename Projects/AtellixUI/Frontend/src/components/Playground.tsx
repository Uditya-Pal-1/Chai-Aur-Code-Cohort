import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Code2, Copy, LoaderCircle, Monitor, RotateCcw, Smartphone, Sparkles } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'

const LiveCodeEditor = lazy(() => import('./LiveCodeEditor'))

type PlaygroundComponent = 'Button' | 'Card' | 'Badge' | 'Input' | 'Switch' | 'Slider'
type Variant = 'Solid' | 'Outline' | 'Soft' | 'Ghost'
type PreviewSize = 'desktop' | 'mobile'
type ComponentSize = 'Compact' | 'Default' | 'Large'

const components: PlaygroundComponent[] = ['Button', 'Card', 'Badge', 'Input', 'Switch', 'Slider']
const variants: Variant[] = ['Solid', 'Outline', 'Soft', 'Ghost']
const sizes: ComponentSize[] = ['Compact', 'Default', 'Large']

function getSnippet(component: PlaygroundComponent, variant: Variant, label: string, radius: number, glow: boolean, size: ComponentSize, disabled: boolean) {
  const accent = '#ff8a3d'
  const textEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  }
  const escapedText = label.replace(/[&<>]/g, (character) => textEntities[character] ?? character)
  const base = `borderRadius: '${radius}px'`
  const shadow = glow ? `, boxShadow: '0 8px 26px rgba(255, 138, 61, 0.22)'` : ''
  const padding = size === 'Compact' ? '8px 13px' : size === 'Large' ? '15px 25px' : '12px 20px'
  const disabledAttribute = disabled ? ' disabled' : ''

  if (component === 'Button') {
    const styles: Record<Variant, string> = {
      Solid: `background: '${accent}', color: '#17100b', border: '1px solid ${accent}'`,
      Outline: `background: 'transparent', color: '${accent}', border: '1px solid ${accent}'`,
      Soft: `background: 'rgba(255, 138, 61, 0.14)', color: '${accent}', border: '1px solid transparent'`,
      Ghost: `background: 'transparent', color: 'var(--text)', border: '1px solid transparent'`,
    }
    return `<button\n  type="button"${disabledAttribute}\n  style={{ ${base}, ${styles[variant]}, padding: '${padding}', fontWeight: 700${shadow} }}\n>\n  ${escapedText}\n</button>`
  }

  if (component === 'Card') {
    const backgrounds: Record<Variant, string> = {
      Solid: accent,
      Outline: 'transparent',
      Soft: 'rgba(255, 138, 61, 0.1)',
      Ghost: 'transparent',
    }
    const foreground = variant === 'Solid' ? '#17100b' : 'var(--text)'
    return `<article\n  style={{ ${base}, background: '${backgrounds[variant]}', color: '${foreground}', border: '1px solid ${variant === 'Outline' || variant === 'Solid' ? accent : 'rgba(255,255,255,0.12)'}', padding: '${size === 'Compact' ? '16px' : size === 'Large' ? '32px' : '24px'}'${shadow} }}\n>\n  <span>ATELLIX / UI</span>\n  <h3>${escapedText}</h3>\n  <p>A considered surface for your next interface.</p>\n</article>`
  }

  if (component === 'Badge') {
    const styles: Record<Variant, string> = {
      Solid: `background: '${accent}', color: '#17100b'`,
      Outline: `background: 'transparent', color: '${accent}', border: '1px solid ${accent}'`,
      Soft: `background: 'rgba(255, 138, 61, 0.14)', color: '${accent}'`,
      Ghost: `background: 'transparent', color: 'var(--text)'`,
    }
    return `<span\n  style={{ ${base}, ${styles[variant]}, padding: '${size === 'Compact' ? '4px 8px' : size === 'Large' ? '8px 14px' : '6px 11px'}', fontSize: '12px', fontWeight: 700${shadow} }}\n>\n  ${escapedText}\n</span>`
  }

  if (component === 'Switch') {
    return `<label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: '${disabled ? 'not-allowed' : 'pointer'}' }}>\n  <input type="checkbox" role="switch"${disabledAttribute} />\n  <span>${escapedText}</span>\n</label>`
  }

  if (component === 'Slider') {
    return `<label style={{ display: 'grid', gap: '10px', minWidth: '220px' }}>\n  <span>${escapedText}</span>\n  <input type="range" min="0" max="100" defaultValue="64"${disabledAttribute} style={{ accentColor: '${accent}' }} />\n</label>`
  }

  const styles: Record<Variant, string> = {
    Solid: `background: 'var(--bg-soft)', color: 'var(--text)', border: '1px solid ${accent}'`,
    Outline: `background: 'transparent', color: 'var(--text)', border: '1px solid ${accent}'`,
    Soft: `background: 'rgba(255, 138, 61, 0.08)', color: 'var(--text)', border: '1px solid rgba(255,138,61,0.3)'`,
    Ghost: `background: 'transparent', color: 'var(--text)', border: '1px solid transparent'`,
  }
  return `<input\n  type="text"${disabledAttribute}\n  placeholder={${JSON.stringify(label)}}\n  style={{ ${base}, ${styles[variant]}, padding: '${padding}', width: '100%'${shadow} }}\n/>`
}

export default function Playground({ theme }: { theme: 'dark' | 'light' }) {
  const [component, setComponent] = useState<PlaygroundComponent>('Button')
  const [variant, setVariant] = useState<Variant>('Solid')
  const [label, setLabel] = useState('Get started')
  const [radius, setRadius] = useState(12)
  const [glow, setGlow] = useState(true)
  const [size, setSize] = useState<ComponentSize>('Default')
  const [disabled, setDisabled] = useState(false)
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop')
  const [mode, setMode] = useState<'basic' | 'editor'>('basic')
  const [showCode, setShowCode] = useState(false)
  const [editorMounted, setEditorMounted] = useState(false)
  const [editorResetVersion, setEditorResetVersion] = useState(0)
  const [copyStatus, setCopyStatus] = useState('')
  const [pressCount, setPressCount] = useState(0)
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderValue, setSliderValue] = useState(64)
  const snippet = getSnippet(component, variant, label || component, radius, glow, size, disabled)

  const reset = () => {
    setEditorResetVersion((version) => version + 1)
    setComponent('Button')
    setVariant('Solid')
    setLabel('Get started')
    setRadius(12)
    setGlow(true)
    setSize('Default')
    setDisabled(false)
    setPreviewSize('desktop')
    setMode('basic')
    setShowCode(false)
    setPressCount(0)
    setSwitchOn(true)
    setSliderValue(64)
    setCopyStatus('')
  }

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopyStatus('Copied')
      window.setTimeout(() => setCopyStatus(''), 1600)
    } catch (error) {
      console.error('Unable to copy the playground code.', error)
      setCopyStatus('Copy failed')
    }
  }

  const style = {
    borderRadius: `${radius}px`,
    boxShadow: glow ? '0 12px 34px rgba(255, 138, 61, 0.18)' : 'none',
  }
  const variantClass = `playground-demo-${variant.toLowerCase()}`
  const sizeClass = `playground-size-${size.toLowerCase()}`

  return (
    <div className={`playground-workspace ${theme} ${mode === 'editor' ? 'is-editor' : ''}`}>
      <div className="playground-mode-selector" role="tablist" aria-label="Choose playground mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'basic'}
          className={mode === 'basic' ? 'is-active' : ''}
          onClick={() => setMode('basic')}
        >
          <span className="playground-mode-index">01 / BASIC</span>
          <strong>Quick preview</strong>
          <small>Fast controls, no editor startup.</small>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'editor'}
          className={mode === 'editor' ? 'is-active' : ''}
          onClick={() => {
            setEditorMounted(true)
            setMode('editor')
          }}
        >
          <span className="playground-mode-index">02 / LIVE CODE</span>
          <strong>Live code editor</strong>
          <small>Edit React and see it run.</small>
        </button>
      </div>
      <header className="playground-toolbar">
        <div className="playground-toolbar-title">
          <span className="playground-live-dot" />
          <span>{mode === 'basic' ? 'QUICK PREVIEW' : 'LIVE REACT SANDBOX'}</span>
          <i />
          <span>{mode === 'basic' ? 'NO EDITOR STARTUP' : 'CODEMIRROR + PREVIEW'}</span>
        </div>
        <div className="playground-toolbar-actions">
          {mode === 'basic' && <div className="playground-device-switch" role="group" aria-label="Preview width">
            <button type="button" className={previewSize === 'desktop' ? 'is-active' : ''} aria-pressed={previewSize === 'desktop'} aria-label="Desktop preview" onClick={() => setPreviewSize('desktop')}><Monitor size={15} /></button>
            <button type="button" className={previewSize === 'mobile' ? 'is-active' : ''} aria-pressed={previewSize === 'mobile'} aria-label="Mobile preview" onClick={() => setPreviewSize('mobile')}><Smartphone size={15} /></button>
          </div>}
          <button type="button" className="playground-reset" onClick={reset}><RotateCcw size={14} /> Reset</button>
        </div>
      </header>

      <div className="playground-main">
        <aside className="playground-controls">
          <div className="playground-panel-heading">
            <span>01</span>
            <div><strong>Customize</strong><small>Adjust your component</small></div>
          </div>

          <fieldset className="playground-control-group">
            <legend>Component</legend>
            <div className="playground-component-list">
              {components.map((item, index) => (
                <button type="button" key={item} className={component === item ? 'is-active' : ''} aria-pressed={component === item} onClick={() => setComponent(item)}>
                  <span className="playground-component-number">0{index + 1}</span>{item}
                  {component === item && <span className="playground-selection-mark" aria-hidden="true">↗</span>}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="playground-control-group">
            <legend>Appearance</legend>
            <label className="playground-field-label" htmlFor="playground-variant">Variant</label>
            <select id="playground-variant" value={variant} onChange={(event) => setVariant(event.target.value as Variant)}>
              {variants.map((item) => <option key={item}>{item}</option>)}
            </select>

            <label className="playground-field-label" htmlFor="playground-label">{component === 'Input' ? 'Placeholder' : 'Label'}</label>
            <input id="playground-label" value={label} maxLength={32} onChange={(event) => setLabel(event.target.value)} />

            <label className="playground-field-label" htmlFor="playground-size">Component size</label>
            <select id="playground-size" value={size} onChange={(event) => setSize(event.target.value as ComponentSize)}>
              {sizes.map((item) => <option key={item}>{item}</option>)}
            </select>

            <div className="playground-radius-heading"><label className="playground-field-label" htmlFor="playground-radius">Corner radius</label><output htmlFor="playground-radius">{radius}px</output></div>
            <input id="playground-radius" className="playground-range" type="range" min="0" max="28" value={radius} onChange={(event) => setRadius(Number(event.target.value))} />

            <label className="playground-toggle-row">
              <span><strong>Ambient glow</strong><small>Subtle orange elevation</small></span>
              <input type="checkbox" checked={glow} onChange={(event) => setGlow(event.target.checked)} />
              <i aria-hidden="true" />
            </label>
            <label className="playground-toggle-row">
              <span><strong>Disabled state</strong><small>Preview unavailable controls</small></span>
              <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
              <i aria-hidden="true" />
            </label>
          </fieldset>

          <div className="playground-token-note"><Sparkles size={15} /><span>Atellix orange token <code>#FF8A3D</code></span></div>
        </aside>

        <section className="playground-canvas-panel" aria-label={mode === 'basic' ? 'Quick component preview' : 'Live React code editor'}>
          {mode === 'basic' && <>
          <div className="playground-canvas-heading">
            <div><span className="playground-canvas-eyebrow">CANVAS</span><strong>{component} <span>/</span> {variant}</strong></div>
            <span className="playground-breakpoint">{previewSize === 'desktop' ? '1280px' : '375px'}</span>
          </div>
          {!showCode && <div className={`playground-canvas ${previewSize}`}>
            <div className="playground-device-frame">
              <span className="playground-canvas-grid" aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className={`playground-rendered playground-${component.toLowerCase()} ${variantClass} ${sizeClass}`}
                  style={style}
                  key={`${component}-${variant}-${size}-${disabled}`}
                  initial={{ opacity: 0, y: 10, scale: 0.97, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {component === 'Button' && <button type="button" disabled={disabled} className={`playground-preview-button ${variantClass}`} style={style} onClick={() => setPressCount((count) => count + 1)}>{label || 'Button'}<span aria-hidden="true">↗</span></button>}
                  {component === 'Card' && <article className={`playground-preview-card ${variantClass}`} style={style}><div className="playground-card-top"><span>ATELLIX / 001</span><Sparkles size={16} /></div><strong>{label || 'Thoughtful by design'}</strong><p>A focused component preview with clear hierarchy, considered spacing, and a quiet orange accent.</p><button type="button" disabled={disabled} onClick={() => setPressCount((count) => count + 1)}>Explore pattern <span aria-hidden="true">↗</span></button></article>}
                  {component === 'Badge' && <span className={`playground-preview-badge ${variantClass}`} style={style}><i />{label || 'Design system'}</span>}
                  {component === 'Input' && <label className="playground-preview-input"><span>PROJECT NAME</span><input disabled={disabled} className={`playground-preview-input-field ${variantClass}`} type="text" placeholder={label || 'Name your project'} style={style} /><small>Choose a short, descriptive name.</small></label>}
                  {component === 'Switch' && <label className={`playground-preview-switch ${disabled ? 'is-disabled' : ''}`}><input type="checkbox" role="switch" checked={switchOn} disabled={disabled} onChange={(event) => setSwitchOn(event.target.checked)} /><span className="playground-switch-track" style={{ borderRadius: radius > 12 ? '999px' : `${radius}px` }}><i /></span><span>{label || 'Enable notifications'}</span></label>}
                  {component === 'Slider' && <label className="playground-preview-slider"><span>{label || 'Intensity'} <output>{sliderValue}%</output></span><input type="range" min="0" max="100" value={sliderValue} disabled={disabled} onChange={(event) => setSliderValue(Number(event.target.value))} style={{ borderRadius: `${radius}px` }} /><small>Drag to adjust the preview value.</small></label>}
                </motion.div>
              </AnimatePresence>
              {pressCount > 0 && component !== 'Input' && <span className="playground-interaction-state" role="status">Preview activated · {pressCount}</span>}
            </div>
          </div>}

          <div className="playground-code-toolbar">
            <div className="playground-code-tabs" role="tablist" aria-label="Playground output">
              <button type="button" role="tab" aria-selected={!showCode} className={!showCode ? 'is-active' : ''} onClick={() => setShowCode(false)}><Monitor size={14} /> Preview</button>
              <button type="button" role="tab" aria-selected={showCode} className={showCode ? 'is-active' : ''} onClick={() => setShowCode(true)}><Code2 size={14} /> JSX</button>
            </div>
            <button type="button" className="playground-copy" onClick={() => { void copySnippet() }}>{copyStatus === 'Copied' ? <Check size={14} /> : <Copy size={14} />}{copyStatus || 'Copy JSX'}</button>
          </div>
          {showCode ? (
            <pre className="playground-code"><code>{snippet}</code></pre>
          ) : (
            <div className="playground-code-hint"><Code2 size={14} /><span>Quick controls stay lightweight. Choose <strong>Live code editor</strong> above to edit and run React.</span></div>
          )}
          </>}
          {editorMounted && (
            <div className="playground-editor-panel" hidden={mode !== 'editor'}>
              <div className="playground-editor-notice"><span className="playground-live-dot" /><span>Edit <code>App.js</code> and see your React component run. The sandbox needs an internet connection.</span></div>
              <Suspense fallback={<div className="playground-editor-loading"><LoaderCircle size={18} /><span>Loading the live editor…</span></div>}>
                <ErrorBoundary name="LiveCodeEditor">
                  <LiveCodeEditor key={editorResetVersion} code={snippet} theme={theme} />
                </ErrorBoundary>
              </Suspense>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
