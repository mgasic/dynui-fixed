import { useEffect, useRef } from 'react'

type KeyboardHandler = (event: KeyboardEvent) => void

interface UseKeyboardOptions {
  enabled?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export function useKeyboard(
  keys: string | string[],
  handler: KeyboardHandler,
  options: UseKeyboardOptions = {}
) {
  const { enabled = true, preventDefault = false, stopPropagation = false } = options
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!enabled) return

    const targetKeys = Array.isArray(keys) ? keys : [keys]

    const handleKeyDown = (event: KeyboardEvent) => {
      if (targetKeys.includes(event.key)) {
        if (preventDefault) event.preventDefault()
        if (stopPropagation) event.stopPropagation()
        handlerRef.current(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [keys, enabled, preventDefault, stopPropagation])
}
