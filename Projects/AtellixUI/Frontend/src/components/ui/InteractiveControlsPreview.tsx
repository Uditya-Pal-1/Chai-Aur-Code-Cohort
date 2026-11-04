import { useState } from 'react'
import { Check, Eye, EyeOff, Loader2, Moon, Sparkles, Sun, Volume2 } from 'lucide-react'

export default function InteractiveControlsPreview() {
  const [toggleState, setToggleState] = useState(true)
  const [sliderStep, setSliderStep] = useState(75)
  const [selectedSegment, setSelectedSegment] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly')
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inputText, setInputText] = useState('atellix-theme-alpha')

  const triggerLoading = () => {
    setLoadingBtn(true)
    setTimeout(() => setLoadingBtn(false), 1800)
  }

  return (
    <div className="demo-stack demo-controls-showcase">
      {/* Control 1: Range Slider with Steps and Ticks */}
      <div className="demo-control-block">
        <div className="demo-control-header">
          <label htmlFor="stepped-slider" className="demo-control-label">
            <Volume2 size={15} /> Intensity Level
          </label>
          <span className="demo-badge demo-badge-primary">{sliderStep}%</span>
        </div>
        <input
          id="stepped-slider"
          type="range"
          min="0"
          max="100"
          step="25"
          value={sliderStep}
          onChange={(e) => setSliderStep(Number(e.target.value))}
          className="demo-range-slider"
        />
        <div className="demo-range-ticks" aria-hidden="true">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Control 2: DaisyUI Toggle with Icon indicators */}
      <div className="demo-control-block demo-toggle-row">
        <div>
          <strong>Dark Atmosphere</strong>
          <p className="demo-control-sub">Switch between high-contrast and ambient night theme.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={toggleState}
          className={`demo-icon-toggle ${toggleState ? 'is-checked' : ''}`}
          onClick={() => setToggleState(!toggleState)}
        >
          <span className="demo-toggle-thumb">
            {toggleState ? <Moon size={12} color="#120c08" /> : <Sun size={12} color="#120c08" />}
          </span>
        </button>
      </div>

      {/* Control 3: Segmented Button Group */}
      <div className="demo-control-block">
        <label className="demo-control-label">Report Interval</label>
        <div className="demo-segmented-bar" role="group" aria-label="Interval selection">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((interval) => (
            <button
              key={interval}
              type="button"
              className={`demo-segmented-btn ${selectedSegment === interval ? 'is-active' : ''}`}
              onClick={() => setSelectedSegment(interval)}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>

      {/* Control 4: Floating Label Input with Visibility Toggle */}
      <div className="demo-control-block">
        <label className="demo-control-label">Token Vault Secret</label>
        <div className="demo-input-with-action">
          <input
            type={showPassword ? 'text' : 'password'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter token secret"
          />
          <button
            type="button"
            className="demo-icon-button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Control 5: Action Button with Loading State */}
      <div className="demo-control-block demo-button-row">
        <button
          type="button"
          className="demo-button demo-button-primary"
          onClick={triggerLoading}
          disabled={loadingBtn}
        >
          {loadingBtn ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              <Sparkles size={15} /> Compile Tokens <Check size={14} />
            </>
          )}
        </button>
        <button type="button" className="demo-button demo-button-subtle">
          Reset Defaults
        </button>
      </div>

      <span className="demo-hint">
        DaisyUI inspired input controls: stepped range slider, icon toggle switch, and button loading states.
      </span>
    </div>
  )
}

