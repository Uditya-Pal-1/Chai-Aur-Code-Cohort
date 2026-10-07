import { useEffect } from 'react'

const REVEAL_THRESHOLD = 0.08

export default function useScrollReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-reveal')
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: REVEAL_THRESHOLD },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
}
