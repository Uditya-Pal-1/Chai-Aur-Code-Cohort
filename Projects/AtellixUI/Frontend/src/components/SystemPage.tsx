import { useState } from 'react'
import { Accessibility, ArrowUpRight, Check, Copy, Moon, Palette, Ruler, Sun, Type } from 'lucide-react'
import { getContrastRatio } from '../utils/color'

interface SystemPageProps {
  theme: 'dark' | 'light'
  accentColor: string
  onToggleTheme: () => void
  onSelectAccent: (color: string) => void
  onNavigateHome: () => void
  onNavigateToThemes: () => void
  onNavigateToComponents: () => void
}

const accentOptions = [
  { name: 'Ember', color: '#ff8a3d' },
  { name: 'Cobalt', color: '#2563eb' },
  { name: 'Jade', color: '#10b981' },
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Rose', color: '#f43f5e' },
]

const spacingTokens = [
  { name: 'space-1', value: '0.25rem', pixels: '4px' },
  { name: 'space-2', value: '0.5rem', pixels: '8px' },
  { name: 'space-3', value: '0.75rem', pixels: '12px' },
  { name: 'space-4', value: '1rem', pixels: '16px' },
  { name: 'space-6', value: '1.5rem', pixels: '24px' },
  { name: 'space-8', value: '2rem', pixels: '32px' },
]

const typeTokens = [
  { name: 'Display', value: 'clamp(2.5rem, 7vw, 4.875rem)', sample: 'Aa', size: 'clamp(2.5rem, 7vw, 4.875rem)' },
  { name: 'Heading', value: 'clamp(1.75rem, 3.4vw, 2.5rem)', sample: 'Aa', size: 'clamp(1.75rem, 3.4vw, 2.5rem)' },
  { name: 'Body', value: '1rem / 1.65', sample: 'Aa', size: '1rem' },
  { name: 'Label', value: '0.8125rem / 1.4', sample: 'Aa', size: '0.8125rem' },
]

export default function SystemPage({
  theme,
  accentColor,
  onToggleTheme,
  onSelectAccent,
  onNavigateHome,
  onNavigateToThemes,
  onNavigateToComponents,
}: SystemPageProps) {
  const [copyStatus, setCopyStatus] = useState('')
  const background = theme === 'dark' ? '#050505' : '#f6f4f0'
  const surface = theme === 'dark' ? '#101010' : '#fffefa'
  const foreground = theme === 'dark' ? '#f4f1ed' : '#171717'
  const contrastRatio = getContrastRatio(accentColor, background)
  const contrastPasses = contrastRatio >= 4.5
  const tokenCss = `:root {
  color-scheme: ${theme};
  --color-background: ${background};
  --color-surface: ${surface};
  --color-text: ${foreground};
  --color-accent: ${accentColor};
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --radius-card: 1rem;
  --radius-control: 0.625rem;
}`

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyStatus(`${label} copied`)
    } catch (error) {
      console.error('Unable to copy design token:', error)
      setCopyStatus('Copy failed. Check browser clipboard permissions.')
    }

    window.setTimeout(() => setCopyStatus(''), 2400)
  }

  return (
    <section className="section-block system-page">
      <div className="wrap">
        <a className="components-back-link" href="/" onClick={(event) => {
          event.preventDefault()
          onNavigateHome()
        }}>← Back to AtellixUI</a>

        <header className="system-hero">
          <span className="eyebrow">THE ATELLIX FOUNDATION</span>
          <h1>A system you can <em>build with.</em></h1>
          <p className="lead">
            Explore live colors, check contrast, and copy practical design tokens for your next interface.
          </p>
          <div className="system-hero-actions">
            <button type="button" className="btn" onClick={onNavigateToComponents}>
              Browse components <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <button type="button" className="system-quiet-button" onClick={onNavigateToThemes}>
              Explore theme presets
            </button>
          </div>
        </header>

        <section className="system-tool-panel" aria-labelledby="system-colors-title">
          <div className="system-tool-heading">
            <div>
              <span className="eyebrow">01 / COLOR & CONTRAST</span>
              <h2 id="system-colors-title">Tune the live foundation.</h2>
              <p>Changes apply across the current site preview. Copy the full CSS token set when it feels right.</p>
            </div>
            <button
              type="button"
              className="system-mode-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-pressed={theme === 'light'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              <span>{theme === 'dark' ? 'Obsidian' : 'Soft Ivory'}</span>
            </button>
          </div>

          <div className="system-color-workbench">
            <div className="system-accent-picker">
              <div className="system-accent-heading">
                <Palette size={17} aria-hidden="true" />
                <div><strong>Accent palette</strong><small>Choose a brand color</small></div>
              </div>
              <div className="system-accent-options" role="group" aria-label="Accent colors">
                {accentOptions.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    className={`system-accent-option ${accentColor.toLowerCase() === option.color ? 'is-selected' : ''}`}
                    onClick={() => onSelectAccent(option.color)}
                    aria-label={`Use ${option.name} accent`}
                    aria-pressed={accentColor.toLowerCase() === option.color}
                  >
                    <span style={{ backgroundColor: option.color }}>{accentColor.toLowerCase() === option.color && <Check size={14} />}</span>
                    <small>{option.name}</small>
                  </button>
                ))}
              </div>
              <div className="system-current-accent">
                <span className="system-color-chip" style={{ backgroundColor: accentColor }} />
                <code>--color-accent: {accentColor}</code>
                <button type="button" onClick={() => copyText('Accent token', `--color-accent: ${accentColor};`)} aria-label="Copy accent token"><Copy size={15} /></button>
              </div>
            </div>

            <div className={`system-contrast-card ${contrastPasses ? 'is-pass' : 'is-review'}`}>
              <Accessibility size={19} aria-hidden="true" />
              <div>
                <strong>{contrastPasses ? 'Readable for text' : 'Use accent for decoration'}</strong>
                <p>{contrastRatio.toFixed(2)}:1 against the {theme === 'dark' ? 'dark' : 'light'} canvas</p>
                <small>{contrastPasses ? 'Meets WCAG AA for normal text.' : 'Does not meet 4.5:1 for normal text. Keep body copy on the text token.'}</small>
              </div>
            </div>
          </div>

          <div className="system-role-swatches" role="group" aria-label="Semantic color roles">
            {[
              { name: 'Canvas', value: background },
              { name: 'Surface', value: surface },
              { name: 'Text', value: foreground },
              { name: 'Accent', value: accentColor },
            ].map((token) => (
              <div className="system-role-token" key={token.name}>
                <span style={{ backgroundColor: token.value }} />
                <div><strong>{token.name}</strong><code>{token.value}</code></div>
              </div>
            ))}
          </div>
          <button type="button" className="system-copy-all" onClick={() => copyText('CSS tokens', tokenCss)}>
            <Copy size={16} aria-hidden="true" /> Copy CSS tokens
          </button>
          <pre className="system-token-code"><code>{tokenCss}</code></pre>
          <p className="system-copy-status" role="status" aria-live="polite">{copyStatus}</p>
        </section>

        <section className="system-reference-grid" aria-label="Developer token reference">
          <article className="system-reference-card system-spacing-card">
            <div className="system-reference-heading"><Ruler size={19} aria-hidden="true" /><div><span className="eyebrow">02 / SPACING</span><h2>Consistent rhythm.</h2></div></div>
            <p>Use a compact 4px base scale for layout gaps, component padding, and page sections.</p>
            <div className="system-spacing-list">
              {spacingTokens.map((token) => (
                <button type="button" className="system-spacing-token" key={token.name} onClick={() => copyText(token.name, token.value)} aria-label={`Copy ${token.name}, ${token.value}`}>
                  <code>{token.name}</code><span><i style={{ width: token.pixels }} /></span><strong>{token.value}</strong>
                </button>
              ))}
            </div>
          </article>

          <article className="system-reference-card system-type-card">
            <div className="system-reference-heading"><Type size={19} aria-hidden="true" /><div><span className="eyebrow">03 / TYPOGRAPHY</span><h2>Clear at every scale.</h2></div></div>
            <p>Fluid headings pair with a readable body size and generous line height.</p>
            <div className="system-type-list">
              {typeTokens.map((token) => (
                <button type="button" className="system-type-token" key={token.name} onClick={() => copyText(`${token.name} type token`, token.value)}>
                  <span style={{ fontSize: token.size }}>{token.sample}</span><strong>{token.name}</strong><code>{token.value}</code>
                </button>
              ))}
            </div>
          </article>

          <article className="system-reference-card system-access-card">
            <div className="system-reference-heading"><Accessibility size={19} aria-hidden="true" /><div><span className="eyebrow">04 / ACCESSIBILITY</span><h2>Good defaults matter.</h2></div></div>
            <ul>
              <li><Check size={15} /> Visible keyboard focus on controls</li>
              <li><Check size={15} /> Reduced-motion preference respected</li>
              <li><Check size={15} /> Body text stays on semantic text colors</li>
              <li><Check size={15} /> Color is not the only state indicator</li>
            </ul>
            <p>For body copy, use the semantic text token rather than a saturated accent.</p>
          </article>
        </section>

        <section className="system-architecture">
          <div>
            <span className="eyebrow">PUT THE SYSTEM TO WORK</span>
            <h2>One foundation.<br /><em>Multiple ways to build.</em></h2>
            <p>Start from a component, tune the theme, and bring the tokens into your product code.</p>
          </div>
          <div className="architecture-stack">
            <article><span>01</span><div><strong>Choose</strong><small>Explore ready-to-use component patterns</small></div></article>
            <article><span>02</span><div><strong>Customize</strong><small>Set a theme and adjust accessible color roles</small></div></article>
            <article><span>03</span><div><strong>Ship</strong><small>Copy CSS tokens and adapt them to your app</small></div></article>
          </div>
        </section>
      </div>
    </section>
  )
}
