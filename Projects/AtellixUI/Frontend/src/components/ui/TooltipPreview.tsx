export default function TooltipPreview() {
  return (
    <div className="demo-centered demo-tooltip-stage">
      <span className="demo-tooltip-wrap">
        <button className="demo-button demo-button-primary" type="button" aria-describedby="tooltip-detail">Hover or focus me</button>
        <span className="demo-tooltip" role="tooltip" id="tooltip-detail">Helpful context appears on hover and keyboard focus.</span>
      </span>
      <span className="demo-hint">Tooltip remains available to keyboard and pointer users.</span>
    </div>
  )
}
