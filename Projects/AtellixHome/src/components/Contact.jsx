import React from 'react'
import { submitRequest } from '../lib/submitRequest'

export default function ContactComponent({ html, Reveal, say }) {
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [error, setError] = React.useState(false)

  return html`<section
    id="visit"
    className="scroll-reveal py-24 px-6 relative overflow-hidden bg-[#e9e0d2] text-[#342c23]"
  >
    <div className="orb w-72 h-72 bg-[#c6aa7b] right-0 top-0" />
    <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <${Reveal}
        ><div className="track gold">Complimentary</div>
        <h2 className="serif text-5xl font-light mt-3 leading-tight">
          Book a private <em>design consultation.</em>
        </h2>
        <p className="opacity-60 mt-5 leading-8">
          Sit on the pieces, touch the materials, and let our designers plan your room — at a
          showroom or in your home.
        </p><//
      >
      <${Reveal} delay=${0.2}
        ><form
          onSubmit=${async (e) => {
            e.preventDefault()
            const form = e.currentTarget
            const formData = new FormData(form)
            setSubmitting(true)
            setError(false)
            setMessage('')
            try {
              const result = await submitRequest('/api/consultations', {
                name: formData.get('name'),
                email: formData.get('email'),
                city: formData.get('city'),
                consent: formData.get('consent') === 'on',
              })
              form.reset()
              setMessage(result.message)
              say('Consultation request recorded')
            } catch (requestError) {
              console.error('Unable to submit the consultation request.', requestError)
              setError(true)
              setMessage(
                requestError.message || 'We could not submit your request. Please try again.',
              )
            } finally {
              setSubmitting(false)
            }
          }}
          className="space-y-4"
        >
          ${[
            ['name', 'Full name', 'text', 'name'],
            ['email', 'Email address', 'email', 'email'],
            ['city', 'Preferred city', 'text', 'address-level2'],
          ].map(
            ([name, placeholder, type, autoComplete]) =>
              html`<div key=${name}>
                <label className="sr-only" htmlFor=${'consultation-' + name}>${placeholder}</label>
                <input
                  id=${'consultation-' + name}
                  name=${name}
                  required
                  type=${type}
                  ...${{ autoComplete }}
                  placeholder=${placeholder}
                  className="w-full bg-[#faf7f0] border border-[#8f7c60]/25 rounded-full px-6 py-4 outline-none focus:border-[#AA8957] transition"
                />
              </div>`,
          )}
          <label className="flex items-start gap-3 text-sm leading-6">
            <input required type="checkbox" name="consent" className="mt-1" />
            <span>
              I agree to have my details stored so the shop can respond, as described in the Privacy
              Notice.
            </span>
          </label>
          ${
            message &&
            html`<p role=${error ? 'alert' : 'status'} className="text-sm">${message}</p>`
          }
          <button className="btn f track w-full" disabled=${submitting}>
            ${submitting ? 'Sending…' : 'Request Consultation'}
          </button>
        </form><//
      >
    </div>
  </section>`
}
