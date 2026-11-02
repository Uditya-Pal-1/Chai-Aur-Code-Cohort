import { useMemo, useState } from 'react'

function luminance(hex: string) {
  const channels = hex.match(/[a-f\d]{2}/gi)?.map((channel) => Number.parseInt(channel, 16) / 255) ?? []
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * (linear[0] ?? 0) + 0.7152 * (linear[1] ?? 0) + 0.0722 * (linear[2] ?? 0)
}

export default function ContrastCheckerPreview() {
  const [foreground, setForeground] = useState('#171717')
  const [background, setBackground] = useState('#fffefa')
  const ratio = useMemo(() => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
    return ((values[0] + 0.05) / (values[1] + 0.05)).toFixed(2)
  }, [foreground, background])
  const contrast = Number(ratio)

  return (
    <div className="demo-stack">
      <div className="demo-contrast-preview" style={{ color: foreground, backgroundColor: background }}>
        <strong>Readable by design</strong><span>Sample text preview</span>
      </div>
      <div className="demo-color-pickers">
        <label>Text <input type="color" value={foreground} onChange={(event) => setForeground(event.target.value)} /></label>
        <label>Surface <input type="color" value={background} onChange={(event) => setBackground(event.target.value)} /></label>
        <strong>{ratio}:1</strong>
      </div>
      <span className="demo-hint" role="status">{contrast >= 4.5 ? 'Passes WCAG AA for normal text.' : 'Below WCAG AA for normal text (4.5:1).'} Large text needs 3:1.</span>
    </div>
  )
}
