import { useState } from 'react'

const steps = ['Account', 'Profile', 'Review']

export default function WizardFormPreview() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [complete, setComplete] = useState(false)

  const next = () => {
    if (step < steps.length - 1) setStep((current) => current + 1)
    else setComplete(true)
  }

  return (
    <div className="demo-stack">
      <div className="demo-stepper" aria-label="Form progress">
        {steps.map((label, index) => (
          <span className={index <= step ? 'is-current' : ''} key={label}>{index + 1}. {label}</span>
        ))}
      </div>
      {complete ? (
        <div className="demo-result" role="status">Workspace details are ready to submit.</div>
      ) : step === 0 ? (
        <label className="demo-field">
          <span className="demo-field-label">Work email</span>
          <input type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
      ) : step === 1 ? (
        <label className="demo-field">
          <span className="demo-field-label">Project name</span>
          <input placeholder="Design system refresh" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
        </label>
      ) : (
        <div className="demo-review">
          <span>Email <strong>{email}</strong></span>
          <span>Project <strong>{projectName}</strong></span>
        </div>
      )}
      {!complete && (
        <div className="demo-actions">
          <button className="demo-button" type="button" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>Back</button>
          <button className="demo-button demo-button-primary" type="button" disabled={step === 0 ? !email.includes('@') : step === 1 ? !projectName.trim() : false} onClick={next}>
            {step === steps.length - 1 ? 'Confirm' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  )
}
