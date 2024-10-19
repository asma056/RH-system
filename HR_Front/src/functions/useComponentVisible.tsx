import { useState, useEffect, useRef, RefObject } from 'react'

export function useComponentVisible<T extends HTMLElement>(
  initialIsVisible: boolean
): {
  ref: RefObject<T>
  isComponentVisible: boolean
  setIsComponentVisible: (isVisible: boolean) => void
} {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef<T>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isComponentVisible, setIsComponentVisible }
}
