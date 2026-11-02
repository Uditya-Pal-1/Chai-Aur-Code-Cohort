import { useState } from 'react'

export default function PalindromeCheckerPreview() {
  const [phrase, setPhrase] = useState('Never odd or even')
  const clean = phrase.toLowerCase().replace(/[^a-z0-9]/g, '')
  const palindrome = clean.length > 0 && clean === [...clean].reverse().join('')

  return (
    <div className="demo-stack">
      <label className="demo-field-label" htmlFor="demo-palindrome">Enter a word or phrase</label>
      <input id="demo-palindrome" value={phrase} onChange={(event) => setPhrase(event.target.value)} />
      <p className="demo-result">{clean ? palindrome ? 'It reads the same both ways.' : 'Not a palindrome yet.' : 'Type something to check.'}</p>
    </div>
  )
}
