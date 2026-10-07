import React from 'react'

export default function TestimonialComponent({ html, Ic }) {
  const [ti, setTi] = React.useState(0)
  React.useEffect(() => {
    const i = setInterval(() => setTi((x) => (x + 1) % 3), 5000)
    return () => clearInterval(i)
  }, [])
  const reviews = [
    [
      'The Monaco sofa changed how we live. Guests ask about it before they ask about the house.',
      'Aman P. — Software Engineer, Auraiya',
    ],
    [
      'Flawless delivery, thoughtful details. Our dining table already feels like a family heirloom.',
      'James H. — Collector, Noida',
    ],
    [
      'Our hotel lobby now feels like a gallery. The team understood the brief completely.',
      'Sofia M. — Interior Designer, New Delhi',
    ],
  ]
  return html`<section
    className="testimonial-section scroll-reveal bg-[#f4efe6] text-[#342c23] py-24 px-6 text-center"
  >
    <div className="max-w-3xl mx-auto">
      <div className="gold flex justify-center gap-1">
        ${[0, 1, 2, 3, 4].map((i) => html`<${Ic} key=${i} n="star" s=${18} />`)}
      </div>
      <div
        key=${ti}
        className="serif text-3xl md:text-4xl italic font-light leading-snug mt-8"
        style=${{ animation: 'fi .9s both' }}
      >
        “${reviews[ti][0]}”
        <div className="track not-italic mt-8 gold !text-[11px]" style=${{ fontFamily: 'Inter' }}>
          ${reviews[ti][1]}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-10">
        ${[0, 1, 2].map((i) => html`<button key=${i} type="button" aria-label=${'Show customer review ' + (i + 1)} aria-pressed=${ti === i} onClick=${() => setTi(i)} className="h-1 rounded-full transition-all duration-500" style=${{ width: ti === i ? 36 : 12, background: ti === i ? '#D4AF37' : '#121212', opacity: ti === i ? 1 : 0.2 }} />`)}
      </div>
    </div>
  </section>`
}
