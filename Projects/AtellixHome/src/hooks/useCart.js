import { useCallback, useMemo, useState } from 'react'
import { fmt } from '../data/catalog'

export default function useCart(onChange) {
  const [items, setItems] = useState([])

  const add = useCallback(
    (product) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id)
        return existing
          ? current.map((item) => (item.id === product.id ? { ...item, q: item.q + 1 } : item))
          : [...current, { ...product, q: 1 }]
      })
      onChange(`${product.n} added to bag`)
    },
    [onChange],
  )

  const removeOne = useCallback((productId) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== productId) return [item]
        return item.q > 1 ? [{ ...item, q: item.q - 1 }] : []
      }),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const count = useMemo(() => items.reduce((sum, item) => sum + item.q, 0), [items])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.q * item.p, 0), [items])
  const totalLabel = useMemo(() => fmt(total), [total])

  return { items, count, total, totalLabel, add, removeOne, clear }
}
