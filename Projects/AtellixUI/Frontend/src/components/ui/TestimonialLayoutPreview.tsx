import { useState } from 'react'

const quotes = [
  { quote: 'The best interfaces make complex work feel obvious.', author: 'Maya Chen', role: 'Product designer' },
  { quote: 'A strong system gives every new idea a place to begin.', author: 'Jon Bell', role: 'Design engineer' },
  { quote: 'Details matter most when they get out of the way.', author: 'Rhea Patel', role: 'Creative director' },
]

export default function TestimonialLayoutPreview() {
  const [index, setIndex] = useState(0)
  const quote = quotes[index]

  return (
    <figure className="demo-testimonial-layout">
      <span className="demo-eyebrow">A NOTE FROM THE COMMUNITY</span>
      <blockquote>“{quote.quote}”</blockquote>
      <figcaption><span className="demo-avatar" aria-hidden="true">{quote.author.split(' ').map((part) => part[0]).join('')}</span><span><strong>{quote.author}</strong><small>{quote.role}</small></span><div><button type="button" aria-label="Previous testimonial" onClick={() => setIndex((index + quotes.length - 1) % quotes.length)}>←</button><button type="button" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % quotes.length)}>→</button></div></figcaption>
    </figure>
  )
}
