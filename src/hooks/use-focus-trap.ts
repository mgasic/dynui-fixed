import { useEffect, useRef } from 'react'

interface UseFocusTrapOptions {
  enabled?: boolean
  initialFocus?: boolean
  returnFocus?: boolean
}

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ')

export function useFocusTrap({
  enabled = true,
  initialFocus = true,
  returnFocus = true
}: UseFocusTrapOptions = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current
    previousFocusRef.current = document.activeElement as HTMLElement

    const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR) as NodeListOf<HTMLElement>
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    if (initialFocus && firstFocusable) {
      firstFocusable.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [enabled, initialFocus, returnFocus])

  return containerRef
}
