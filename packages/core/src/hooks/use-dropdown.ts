import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseDropdownOptions {
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}

export function useDropdown({
  closeOnClickOutside = true,
  closeOnEscape = true
}: UseDropdownOptions = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!closeOnClickOutside) return
      
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (!closeOnEscape) return
      
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, close, closeOnClickOutside, closeOnEscape])

  return {
    isOpen,
    open,
    close,
    toggle,
    containerRef
  }
}