import { useState, useRef, useEffect, useCallback } from 'react'
import type { TooltipPlacement, TooltipTrigger } from '../types/components/dyn-tooltip.types'

interface UseTooltipOptions {
  placement?: TooltipPlacement
  trigger?: TooltipTrigger
  delay?: number
  disabled?: boolean
}

export function useTooltip({
  placement = 'top',
  trigger = 'hover',
  delay = 0,
  disabled = false
}: UseTooltipOptions = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const show = useCallback(() => {
    if (disabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => setIsOpen(true), delay)
    } else {
      setIsOpen(true)
    }
  }, [disabled, delay])

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    isOpen ? hide() : show()
  }, [isOpen, show, hide])

  useEffect(() => {
    const triggerElement = triggerRef.current
    if (!triggerElement || disabled) return

    const handlers: { [key: string]: () => void } = {
      hover: () => {
        triggerElement.addEventListener('mouseenter', show)
        triggerElement.addEventListener('mouseleave', hide)
        return () => {
          triggerElement.removeEventListener('mouseenter', show)
          triggerElement.removeEventListener('mouseleave', hide)
        }
      },
      focus: () => {
        triggerElement.addEventListener('focusin', show)
        triggerElement.addEventListener('focusout', hide)
        return () => {
          triggerElement.removeEventListener('focusin', show)
          triggerElement.removeEventListener('focusout', hide)
        }
      },
      click: () => {
        triggerElement.addEventListener('click', toggle)
        return () => triggerElement.removeEventListener('click', toggle)
      }
    }

    const cleanup = handlers[trigger]?.()
    return cleanup
  }, [trigger, show, hide, toggle, disabled])

  return {
    isOpen,
    triggerRef,
    tooltipRef,
    show,
    hide,
    toggle
  }
}
