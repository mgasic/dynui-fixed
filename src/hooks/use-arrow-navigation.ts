import { useCallback, useRef, useEffect } from 'react'

interface UseArrowNavigationOptions {
  enabled?: boolean
  orientation?: 'horizontal' | 'vertical' | 'both'
  loop?: boolean
  typeahead?: boolean
  selector?: string
}

const DEFAULT_SELECTOR = '[role="tab"], [role="menuitem"], [role="option"], [role="treeitem"], button:not([disabled])'

export function useArrowNavigation({
  enabled = true,
  orientation = 'both',
  loop = true,
  typeahead = false,
  selector = DEFAULT_SELECTOR
}: UseArrowNavigationOptions = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const typeaheadRef = useRef('')
  const typeaheadTimeoutRef = useRef<NodeJS.Timeout>()

  const getNavigableElements = useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(containerRef.current.querySelectorAll(selector)) as HTMLElement[]
  }, [selector])

  const moveFocus = useCallback((direction: 'next' | 'prev' | 'first' | 'last') => {
    const elements = getNavigableElements()
    if (elements.length === 0) return

    const currentIndex = elements.findIndex(el => el === document.activeElement)
    let nextIndex: number

    switch (direction) {
      case 'first':
        nextIndex = 0
        break
      case 'last':
        nextIndex = elements.length - 1
        break
      case 'next':
        nextIndex = currentIndex + 1
        if (nextIndex >= elements.length) {
          nextIndex = loop ? 0 : elements.length - 1
        }
        break
      case 'prev':
        nextIndex = currentIndex - 1
        if (nextIndex < 0) {
          nextIndex = loop ? elements.length - 1 : 0
        }
        break
      default:
        return
    }

    elements[nextIndex]?.focus()
  }, [getNavigableElements, loop])

  const handleTypeahead = useCallback((char: string) => {
    if (!typeahead) return false

    clearTimeout(typeaheadTimeoutRef.current)
    typeaheadRef.current += char.toLowerCase()

    const elements = getNavigableElements()
    const match = elements.find(el => {
      const text = el.textContent?.toLowerCase() || ''
      return text.startsWith(typeaheadRef.current)
    })

    if (match) {
      match.focus()
    }

    typeaheadTimeoutRef.current = setTimeout(() => {
      typeaheadRef.current = ''
    }, 500)

    return !!match
  }, [typeahead, getNavigableElements])

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e

      // Handle arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault()
        
        const isVertical = orientation === 'vertical' || orientation === 'both'
        const isHorizontal = orientation === 'horizontal' || orientation === 'both'

        if (key === 'ArrowUp' && isVertical) {
          moveFocus('prev')
        } else if (key === 'ArrowDown' && isVertical) {
          moveFocus('next')
        } else if (key === 'ArrowLeft' && isHorizontal) {
          moveFocus('prev')
        } else if (key === 'ArrowRight' && isHorizontal) {
          moveFocus('next')
        }
      }
      // Handle Home/End
      else if (key === 'Home') {
        e.preventDefault()
        moveFocus('first')
      } else if (key === 'End') {
        e.preventDefault()
        moveFocus('last')
      }
      // Handle typeahead
      else if (key.length === 1 && /[a-zA-Z0-9]/.test(key)) {
        handleTypeahead(key)
      }
    }

    containerRef.current.addEventListener('keydown', handleKeyDown)
    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown)
  }, [enabled, orientation, moveFocus, handleTypeahead])

  return { containerRef, moveFocus }
}
