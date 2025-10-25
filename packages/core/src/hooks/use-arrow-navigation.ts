import { useCallback, useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

export interface UseArrowNavigationOptions {
  orientation?: 'horizontal' | 'vertical' | 'both'
  loop?: boolean
  selector?: string
  onNavigate?: (index: number, element: HTMLElement) => void
  typeahead?: boolean
}

interface UseArrowNavigationResult {
  containerRef: MutableRefObject<HTMLElement | null>
  focusElement: (index: number) => void
  getFocusableElements: () => HTMLElement[]
  getFocusedIndex: () => number
  focusFirst: () => void
  focusLast: () => void
  focusIndex: (index: number) => void
  setContainerRef: (node: HTMLElement | null) => void
}

/**
 * Advanced keyboard navigation hook for components like Tabs, Menu, etc.
 * Implements WAI-ARIA authoring practices for arrow key navigation
 */
export function useArrowNavigation({
  orientation = 'horizontal',
  loop = true,
  selector = '[role="tab"], [role="menuitem"], [role="option"]',
  onNavigate
}: UseArrowNavigationOptions = {}): UseArrowNavigationResult {
  const containerRef = useRef<HTMLElement | null>(null)
  const focusedIndexRef = useRef(-1)

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(containerRef.current.querySelectorAll(selector)) as HTMLElement[]
  }, [selector])

  const focusElement = useCallback((index: number) => {
    const elements = getFocusableElements()
    if (index < 0 || index >= elements.length) return

    const element = elements[index]
    if (element) {
      element.focus()
      focusedIndexRef.current = index
      onNavigate?.(index, element)
    }
  }, [getFocusableElements, onNavigate])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const elements = getFocusableElements()
    if (elements.length === 0) return

    const currentIndex = focusedIndexRef.current
    let nextIndex = currentIndex

    const isHorizontal = orientation === 'horizontal' || orientation === 'both'
    const isVertical = orientation === 'vertical' || orientation === 'both'

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault()
          nextIndex = currentIndex + 1
        }
        break
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault()
          nextIndex = currentIndex - 1
        }
        break
      case 'ArrowDown':
        if (isVertical) {
          event.preventDefault()
          nextIndex = currentIndex + 1
        }
        break
      case 'ArrowUp':
        if (isVertical) {
          event.preventDefault()
          nextIndex = currentIndex - 1
        }
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = elements.length - 1
        break
      default:
        return
    }

    // Handle looping
    if (loop) {
      if (nextIndex >= elements.length) nextIndex = 0
      if (nextIndex < 0) nextIndex = elements.length - 1
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, elements.length - 1))
    }

    focusElement(nextIndex)
  }, [getFocusableElements, focusElement, orientation, loop])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const getFocusedIndex = useCallback(() => focusedIndexRef.current, [])

  const focusFirst = useCallback(() => {
    focusElement(0)
  }, [focusElement])

  const focusLast = useCallback(() => {
    const elements = getFocusableElements()
    if (elements.length > 0) {
      focusElement(elements.length - 1)
    }
  }, [focusElement, getFocusableElements])

  const focusIndex = useCallback(
    (index: number) => {
      focusElement(index)
    },
    [focusElement]
  )

  const setContainerRef = useCallback((node: HTMLElement | null) => {
    containerRef.current = node
  }, [])

  return {
    containerRef,
    focusElement,
    getFocusableElements,
    getFocusedIndex,
    focusFirst,
    focusLast,
    focusIndex,
    setContainerRef
  }
}