import { useCallback, useEffect } from 'react'

export interface UseKeyboardOptions {
  enabled?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export function useKeyboard(
  key: string | string[],
  callback: (event: KeyboardEvent) => void,
  { enabled = true, preventDefault = false, stopPropagation = false }: UseKeyboardOptions = {}
) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(key) ? key : [key]
      
      if (!keys.includes(event.key)) return
      
      if (preventDefault) event.preventDefault()
      if (stopPropagation) event.stopPropagation()
      
      callback(event)
    },
    [key, callback, preventDefault, stopPropagation]
  )

  useEffect(() => {
    if (!enabled) return

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [enabled, handleKeyPress])
}