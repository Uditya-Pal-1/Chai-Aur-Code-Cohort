import { useEffect, useRef, useState } from 'react'

export default function MemoryGamePreview() {
  const [cards, setCards] = useState<number[]>([])
  const [matches, setMatches] = useState<number[]>([])
  const mismatchTimeout = useRef<number | undefined>(undefined)

  useEffect(() => () => {
    if (mismatchTimeout.current !== undefined) window.clearTimeout(mismatchTimeout.current)
  }, [])

  const revealCard = (card: number) => {
    if (cards.length >= 2 || cards.includes(card) || matches.includes(card)) return
    const nextCards = [...cards, card]
    if (nextCards.length === 2 && nextCards[0] % 2 === nextCards[1] % 2) {
      setMatches((value) => [...value, ...nextCards])
      setCards([])
      return
    }
    setCards(nextCards)
    if (nextCards.length === 2) {
      mismatchTimeout.current = window.setTimeout(() => {
        setCards([])
        mismatchTimeout.current = undefined
      }, 700)
    }
  }

  return (
    <div className="demo-memory">
      {[0, 1, 2, 3].map((card) => {
        const shown = cards.includes(card) || matches.includes(card)
        return (
          <button
            key={card}
            type="button"
            aria-label={shown ? `Card ${card + 1}: ${card % 2 ? 'B' : 'A'}` : `Reveal card ${card + 1}`}
            className={shown ? 'is-revealed' : ''}
            onClick={() => revealCard(card)}
          >
            {shown ? card % 2 ? 'B' : 'A' : '?'}
          </button>
        )
      })}
      {matches.length === 4 && <span>All pairs matched.</span>}
    </div>
  )
}
