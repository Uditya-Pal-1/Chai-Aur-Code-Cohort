import { useEffect, useState } from 'react'

const HEADER_SCROLL_THRESHOLD = 40

export default function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return isScrolled
}
