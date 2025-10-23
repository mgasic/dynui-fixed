import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseTooltipOptions {
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  hideDelay?: number
}

export interface TooltipPosition {
  x: number
  y: number
  placement: string
}

export function useTooltip({
  placement = 'top',
  delay = 500,
  hideDelay = 0
}: UseTooltipOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<TooltipPosition>({ x: 0, y: 0, placement })
  const triggerRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const hideTimeoutRef = useRef<NodeJS.Timeout>()

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let x = 0
    let y = 0

    switch (placement) {
      case 'top':
        x = rect.left + rect.width / 2 + scrollX
        y = rect.top + scrollY
        break
      case 'bottom':
        x = rect.left + rect.width / 2 + scrollX
        y = rect.bottom + scrollY
        break
      case 'left':
        x = rect.left + scrollX
        y = rect.top + rect.height / 2 + scrollY
        break
      case 'right':
        x = rect.right + scrollX
        y = rect.top + rect.height / 2 + scrollY
        break
    }

    setPosition({ x, y, placement })
  }, [placement])

  const show = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      calculatePosition()
      setIsVisible(true)
    }, delay)
  }, [calculatePosition, delay])

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, hideDelay)
    } else {
      setIsVisible(false)
    }
  }, [hideDelay])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  return {
    isVisible,
    position,
    show,
    hide,
    triggerRef
  }
}