import React from 'react'
import { submitRequest } from '../lib/submitRequest'

export default function CheckoutForm({ html, items, onCancel, onDone, onSuccess }) {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')
  const [orderId, setOrderId] = React.useState('')

  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        postalCode: formData.get('postalCode'),
      },
      items: items.map(({ id, q }) => ({ id, quantity: q })),
      consent: formData.get('consent') === 'on',
    }

    try {
      const result = await submitRequest('/api/orders', payload)
      setOrderId(result.orderId)
      onSuccess(result.orderId)
    } catch (requestError) {
      console.error('Unable to submit the order request.', requestError)
      setError(requestError.message || 'We could not submit the order request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderId) {
    return html`<div className="flex-1 overflow-y-auto mt-6" role="status">
      <h3 className="serif text-2xl">Order request recorded</h3>
      <p className="mt-3 text-sm leading-6">Reference: <strong>${orderId}</strong></p>
      <p className="mt-3 text-sm leading-6">
        This request is unpaid. Payment, delivery charges, and final terms are not confirmed yet. No
        payment has been taken.
      </p>
      <button type="button" className="btn f track w-full mt-6" onClick=${onDone || onCancel}>
        Close
      </button>
    </div>`
  }

  return html`<form
    aria-label="Delivery details"
    onSubmit=${submit}
    className="flex-1 overflow-y-auto mt-5 space-y-3"
  >
    <h3 className="serif text-2xl">Delivery details</h3>
    <p className="text-sm leading-6 opacity-75">
      This saves an unpaid order request only. Payment is not set up, and delivery charges and final
      terms must still be confirmed.
    </p>
    ${[
      ['name', 'Full name', 'text', 'name'],
      ['email', 'Email address', 'email', 'email'],
      ['phone', 'Phone number', 'tel', 'tel'],
      ['address', 'Street address', 'text', 'street-address'],
      ['city', 'City', 'text', 'address-level2'],
      ['state', 'State', 'text', 'address-level1'],
      ['postalCode', 'Postal code', 'text', 'postal-code'],
    ].map(
      ([name, label, type, autoComplete]) =>
        html`<label key=${name} className="block">
          <span className="sr-only">${label}</span>
          <input
            required
            name=${name}
            type=${type}
            ...${{ autoComplete }}
            placeholder=${label}
            className="w-full rounded-xl border border-[#8f7c60]/25 bg-white/75 px-4 py-3"
          />
        </label>`,
    )}
    <label className="flex items-start gap-3 py-2 text-xs leading-5">
      <input required type="checkbox" name="consent" className="mt-1" />
      <span>
        I agree to have these details and my order request stored so the shop can respond, as
        described in the Privacy Notice.
      </span>
    </label>
    ${error && html`<p role="alert" className="text-sm text-red-800">${error}</p>`}
    <div className="flex gap-3 pb-4">
      <button type="button" className="btn track flex-1" onClick=${onCancel}>Back to bag</button>
      <button type="submit" className="btn f track flex-1" disabled=${submitting}>
        ${submitting ? 'Submitting…' : 'Submit request'}
      </button>
    </div>
  </form>`
}
