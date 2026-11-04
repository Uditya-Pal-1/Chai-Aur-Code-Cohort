import { useState } from 'react'
import { Check, Copy, Palette, ShieldCheck, Sparkles } from 'lucide-react'
import { getContrastRatio } from '../utils/color'

interface ThemeStudioProps {
  currentTheme: 'dark' | 'light'
  accentColor: string
  onToggleTheme: () => void
  onSelectAccent: (token: string) => void
}

const colorPalettes = [
  { name: 'Ember', description: 'Warm, energetic, and expressive', colors: ['#ff8a3d', '#f5660d', '#ff5722', '#d94e00', '#ffb36b'] },
  { name: 'Coastal', description: 'Clear, confident, and modern', colors: ['#38bdf8', '#0ea5e9', '#2563eb', '#14b8a6', '#67e8f9'] },
  { name: 'Verdant', description: 'Natural, balanced, and fresh', colors: ['#34d399', '#10b981', '#22c55e', '#84cc16', '#a3e635'] },
  { name: 'Amethyst', description: 'Creative, polished, and bold', colors: ['#c084fc', '#a855f7', '#8b5cf6', '#6366f1', '#e879f9'] },
  { name: 'Rosewood', description: 'Expressive, warm, and refined', colors: ['#fb7185', '#f43f5e', '#ec4899', '#f97316', '#fda4af'] },
  { name: 'Stone & Gold', description: 'Quiet neutrals with a luxe accent', colors: ['#cbd5e1', '#94a3b8', '#64748b', '#e2e8f0', '#f59e0b'] },
]

export default function HomeThemeStudio({ currentTheme, accentColor, onToggleTheme, onSelectAccent }: ThemeStudioProps) {
  const selectedAccent = accentColor
  const [copied, setCopied] = useState(false)
  const [cardActive, setCardActive] = useState(true)

  const handleAccentChange = (hex: string) => {
    onSelectAccent(hex)
  }

  const selectedPalette = colorPalettes.find((palette) => palette.colors.includes(selectedAccent))
  const accentTextColor = getContrastRatio(selectedAccent, '#171411') >= getContrastRatio(selectedAccent, '#ffffff')
    ? '#171411'
    : '#ffffff'
  const accentContrast = getContrastRatio(selectedAccent, currentTheme === 'dark' ? '#0c0c0c' : '#fffefa')
  const contrastLabel = accentContrast >= 4.5 ? 'AA text contrast' : 'Accent use only'

  const handleCopyTokens = async () => {
    const json = JSON.stringify(
      {
        name: 'atellix-brand-theme',
        mode: currentTheme,
        tokens: {
          '--accent': selectedAccent,
          '--bg': currentTheme === 'dark' ? '#050505' : '#f6f4f0',
          '--surface': currentTheme === 'dark' ? '#101010' : '#ffffff',
          '--line': `${selectedAccent}26`,
          '--contrast-ratio': `${accentContrast.toFixed(1)}:1 (${contrastLabel})`,
        },
      },
      null,
      2
    )

    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="home-theme-studio">
      <div className="home-theme-grid">
        {/* Left Studio Inspector */}
        <div className="home-theme-settings">
          <div className="home-theme-row-head">
            <span className="demo-control-label">
              <Palette size={14} /> BRAND ACCENT PALETTE
            </span>
            <span className="home-selected-palette">
              <span>{selectedPalette?.name ?? 'Custom'}</span>
              <span className="mono home-accent-hex" style={{ color: selectedAccent }}>{selectedAccent}</span>
            </span>
          </div>

          <div className="home-theme-palettes">
            {colorPalettes.map((palette) => (
              <div className={`home-theme-palette ${selectedPalette?.name === palette.name ? 'is-selected' : ''}`} key={palette.name}>
                <div className="home-theme-palette-info">
                  <strong>{palette.name}</strong>
                  <span>{palette.description}</span>
                </div>
                <div className="home-theme-swatches" role="group" aria-label={`${palette.name} palette colors`}>
                  {palette.colors.map((hex, index) => (
                    <button
                      key={hex}
                      type="button"
                      className={`home-theme-swatch ${selectedAccent === hex ? 'is-selected' : ''}`}
                      style={{ backgroundColor: hex }}
                      onClick={() => handleAccentChange(hex)}
                      aria-label={`Select ${palette.name} accent ${index + 1}, ${hex}`}
                      aria-pressed={selectedAccent === hex}
                      title={`${palette.name} ${index + 1}: ${hex}`}
                    >
                      {selectedAccent === hex && <Check size={14} color={accentTextColor} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="home-theme-mode-row">
            <div>
              <strong>Canvas Atmosphere</strong>
              <small>Switch between deep obsidian and warm soft ivory</small>
            </div>
            <button
              type="button"
              className="demo-button demo-button-subtle"
              onClick={onToggleTheme}
            >
              Mode: <strong>{currentTheme === 'dark' ? 'Obsidian' : 'Soft Ivory'}</strong>
            </button>
          </div>

          <div className="home-theme-css-box">
            <div className="home-theme-css-head">
              <span className="mono">GENERATED CSS TOKENS</span>
              <button type="button" className="home-copy-inline-btn" onClick={handleCopyTokens}>
                {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                <span>{copied ? 'Copied JSON' : 'Export JSON'}</span>
              </button>
            </div>
            <pre className="home-theme-css-code">
              <code>{`:root[data-theme="${currentTheme}"] {
  --accent: ${selectedAccent};
  --line: ${selectedAccent}26;
  --panel: ${currentTheme === 'dark' ? 'rgba(16, 16, 16, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  --radius: 12px;
}`}</code>
            </pre>
          </div>
        </div>

        {/* Right Live Interactive Token Preview Card */}
        <div
          className="home-theme-preview-card"
          style={{ '--dynamic-accent': selectedAccent, '--text-on-accent': accentTextColor } as React.CSSProperties}
        >
          <div className="home-theme-preview-top">
            <span className="demo-badge demo-badge-primary">
              <Sparkles size={12} /> DYNAMIC TOKEN SYNC
            </span>
            <span className="home-contrast-chip">
              <ShieldCheck size={15} aria-hidden="true" /> {contrastLabel} · {accentContrast.toFixed(1)}:1
            </span>
          </div>

          <div className="home-theme-preview-stage" aria-hidden="true">
            <div className="home-preview-window">
              <div className="home-preview-window-bar">
                <span className="home-preview-window-dots"><i /><i /><i /></span>
                <span>atellix / design-system</span>
                <span className="home-preview-live"><i /> LIVE</span>
              </div>
              <div className="home-preview-window-body">
                <div className="home-preview-sidebar">
                  <span className="home-preview-brand-mark" />
                  <i className="is-active" /><i /><i /><i />
                </div>
                <div className="home-preview-workspace">
                  <div className="home-preview-workspace-head">
                    <span><small>WORKSPACE</small><strong>Design system</strong></span>
                    <span className="home-preview-avatar">A</span>
                  </div>
                  <div className="home-preview-widget-grid">
                    <div className="home-preview-widget home-preview-widget--action">
                      <small>PRIMARY ACTION</small>
                      <span className="home-preview-action-sample">Continue <i>↗</i></span>
                      <span className="home-preview-widget-caption">Accent · {selectedAccent}</span>
                    </div>
                    <div className="home-preview-widget home-preview-widget--surface">
                      <small>SURFACE</small>
                      <i /><i /><i />
                      <span className="home-preview-widget-caption">Border · Shadow · Radius</span>
                    </div>
                    <div className="home-preview-widget home-preview-widget--focus">
                      <small>FOCUS STATE</small>
                      <span className="home-preview-input-sample">Search components <i>⌕</i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="home-theme-preview-content">
            <h3>Real-time Token Binding</h3>
            <p>
              Surfaces, borders, focus outlines, and shadows update synchronously across all components with zero layout thrash.
            </p>

            <div className="home-theme-elements-cluster">
              <button
                type="button"
                className="home-dynamic-btn"
                style={{ backgroundColor: selectedAccent, color: accentTextColor }}
              >
                Accent Action ↗
              </button>

              <button
                type="button"
                className="home-dynamic-outline-btn"
                style={{ borderColor: selectedAccent, color: 'var(--text)' }}
              >
                Outline Button
              </button>

              <label className="home-dynamic-toggle">
                <input
                  type="checkbox"
                  checked={cardActive}
                  onChange={(e) => setCardActive(e.target.checked)}
                  aria-label="Toggle preview card state"
                />
                <span style={{ backgroundColor: cardActive ? selectedAccent : 'var(--line)' }}>
                  <i />
                </span>
              </label>
            </div>
          </div>

          <div className="home-theme-preview-footer">
            <div className="home-token-kv">
              <span>Token</span>
              <strong className="mono">{selectedAccent}</strong>
            </div>
            <div className="home-token-kv">
              <span>Contrast</span>
              <strong className="mono">{contrastLabel}</strong>
            </div>
            <div className="home-token-kv">
              <span>Runtime</span>
              <strong className="mono">0ms CSS Var</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
