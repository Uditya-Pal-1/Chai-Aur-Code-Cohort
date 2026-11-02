import { useState } from 'react'

const quotes = [
  'Make it work, then make it clear.',
  'Good interfaces make the next step obvious.',
  'Consistency is a feature users can feel.',
]

export default function QuoteCardPreview() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quotes[quoteIndex])
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch (error) {
      console.error('Unable to copy the quote.', error)
    }
  }

  return (
    <div className="demo-quote">
      <span className="demo-eyebrow">A NOTE ON DESIGN</span>
      <blockquote>“{quotes[quoteIndex]}”</blockquote>
      <div className="demo-actions">
        <button className="demo-button demo-button-primary" type="button" onClick={() => setQuoteIndex((value) => (value + 1) % quotes.length)}>Another quote</button>
        <button className="demo-button" type="button" onClick={copyQuote}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
    </div>
  )
}
