import React from 'react'
import { submitRequest } from '../lib/submitRequest'

export default function FooterComponent({ html, CATS, pick, go, setInfo, FOOTER_INFO, wish, say }) {
  const [newsletterSubmitting, setNewsletterSubmitting] = React.useState(false)
  const [newsletterMessage, setNewsletterMessage] = React.useState('')
  const [newsletterError, setNewsletterError] = React.useState(false)

  return html`<footer
    className="scroll-reveal warm-footer text-[#F7F4EF] pt-16 pb-10 px-6 border-t border-[#D4AF37]/20"
  >
    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-5 gap-10">
      <div className="md:col-span-2">
        <img
          src="/Assets/logo/logo.png"
          alt="AtellixHome"
          className="h-20 w-20 rounded-full object-cover mb-4"
        />
        <h2 className="serif text-2xl">AtellixHome</h2>
        <p className="track gold mt-1 mb-4">REAL FURNITURE REAL VALUE</p>
        <address className="not-italic text-sm leading-6 opacity-70 max-w-sm">
          Noida, Uttar Pradesh, India
        </address>
        <p className="text-xs mt-3 opacity-60">GSTIN: 0000000000</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm">
          <a href="tel:+918859530028" className="opacity-75 hover:opacity-100 hover:text-[#D6BC8D]"
            >Call: 8859530028</a
          ><a
            href="https://wa.me/918859530028"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-75 hover:opacity-100 hover:text-[#D6BC8D]"
            >WhatsApp</a
          >
        </div>
        <p className="opacity-50 mt-6 mb-3 max-w-sm">
          Private launches, delivered before the public.
        </p>
        <form
          onSubmit=${async (e) => {
            e.preventDefault()
            const form = e.currentTarget
            const formData = new FormData(form)
            setNewsletterSubmitting(true)
            setNewsletterError(false)
            setNewsletterMessage('')
            try {
              const result = await submitRequest('/api/newsletter', {
                email: formData.get('email'),
                consent: formData.get('consent') === 'on',
              })
              form.reset()
              setNewsletterMessage(result.message)
              say('Newsletter signup recorded')
            } catch (requestError) {
              console.error('Unable to submit the newsletter signup.', requestError)
              setNewsletterError(true)
              setNewsletterMessage(
                requestError.message || 'We could not complete your signup. Please try again.',
              )
            } finally {
              setNewsletterSubmitting(false)
            }
          }}
          className="max-w-sm"
        >
          <div className="flex border-b border-[#D4AF37]/50">
            <label className="sr-only" htmlFor="newsletter-email">Email address</label
            ><input
              id="newsletter-email"
              name="email"
              required
              type="email"
              ...${{ autoComplete: 'email' }}
              placeholder="Email address"
              className="bg-transparent flex-1 py-3 outline-none placeholder-white/30"
            /><button className="track gold" disabled=${newsletterSubmitting}>
              ${newsletterSubmitting ? 'Joining…' : 'Join'}
            </button>
          </div>
          <label className="flex items-start gap-2 mt-3 text-xs leading-5 opacity-70">
            <input required type="checkbox" name="consent" className="mt-1" />
            <span>
              I consent to the shop storing my email for its newsletter list, as described in the
              Privacy Notice. Newsletter emails are not being sent yet.
            </span>
          </label>
          ${
            newsletterMessage &&
            html`<p role=${newsletterError ? 'alert' : 'status'} className="mt-2 text-xs">
              ${newsletterMessage}
            </p>`
          }
        </form>
      </div>
      <div>
        <div className="track gold mb-4">Shop</div>
        ${CATS.map(
          (c) =>
            html`<a
              key=${c.k}
              href="#shop"
              onClick=${(e) => {
                e.preventDefault()
                pick(c.k)
              }}
              className="block py-1 opacity-60 hover:text-[#D4AF37] hover:opacity-100 cursor-pointer transition"
              >${c.n}</a
            >`,
        )}
      </div>
      <div>
        <div className="track gold mb-4">Showrooms</div>
        ${['Auraiya, Uttar Pradesh', 'Noida', 'New Delhi', 'Old Delhi'].map((l) => html`<div key=${l} className="py-1 opacity-60">${l}</div>`)}
      </div>
      <div>
        <div className="track gold mb-4">Information</div>
        ${[
          ['Privacy Notice', 'privacy'],
          ['Terms & Conditions', 'terms'],
          ['Delivery & Returns', 'delivery'],
          ['Refund Policy', 'refunds'],
          ['Cancellation Policy', 'cancellations'],
          ['Care & Warranty', 'care'],
        ].map(
          ([label, key]) =>
            html`<button
              key=${key}
              className="block py-1 text-left opacity-70 hover:opacity-100 hover:text-[#D6BC8D]"
              onClick=${() => setInfo(FOOTER_INFO[key])}
            >
              ${label}
            </button>`,
        )}<button
          className="block py-1 text-left opacity-70 hover:opacity-100 hover:text-[#D6BC8D]"
          onClick=${() => go('visit')}
        >
          Contact & Consultation
        </button>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 opacity-30 text-xs">
      © 2026 AtellixHome · ${wish.length} saved to wishlist
    </div>
  </footer>`
}
