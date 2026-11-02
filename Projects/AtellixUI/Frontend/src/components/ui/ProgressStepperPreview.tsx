import { useState } from 'react'

const stages = ['Brief', 'Design', 'Build', 'Launch']

export default function ProgressStepperPreview() {
  const [stage, setStage] = useState(1)

  return (
    <div className="demo-stack">
      <ol className="demo-progress-steps" aria-label="Project delivery progress">
        {stages.map((label, index) => <li className={index <= stage ? 'is-complete' : ''} aria-current={index === stage ? 'step' : undefined} key={label}><span>{index < stage ? '✓' : index + 1}</span><small>{label}</small></li>)}
      </ol>
      <div className="demo-progress-track" role="progressbar" aria-label="Project progress" aria-valuemin={0} aria-valuemax={stages.length - 1} aria-valuenow={stage}>
        <span style={{ width: `${stage / (stages.length - 1) * 100}%` }} />
      </div>
      <div className="demo-actions">
        <button className="demo-button" type="button" disabled={stage === 0} onClick={() => setStage((value) => value - 1)}>Previous</button>
        <button className="demo-button demo-button-primary" type="button" disabled={stage === stages.length - 1} onClick={() => setStage((value) => value + 1)}>Next stage</button>
      </div>
      <span className="demo-hint" aria-live="polite">Current stage: {stages[stage]}.</span>
    </div>
  )
}
