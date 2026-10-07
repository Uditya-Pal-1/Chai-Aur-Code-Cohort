import { useCallback, useEffect, useRef, useState } from 'react'

const TOAST_DURATION_MS = 2000

export default function useToast() {
  const [message, setMessage] = useState('')
  const timeoutRef = useRef(null)

  const show = useCallback((nextMessage) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMessage(nextMessage)
    timeoutRef.current = setTimeout(() => {
      setMessage('')
      timeoutRef.current = null
    }, TOAST_DURATION_MS)
  }, [])

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  return { message, show }
}
