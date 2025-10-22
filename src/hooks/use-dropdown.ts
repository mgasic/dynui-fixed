import { useState, useRef, useEffect, useCallback } from 'react'
import type { DropdownPlacement, DropdownTrigger } from '../types/components/dyn-dropdown.types'

interface UseDropdownOptions {
  placement?: DropdownPlacement
  trigger?: DropdownTrigger
  closeOnSelect?: boolean
  disabled?: boolean
}

export function useDropdown({
  placement = 'bottom-start',
  trigger = 'click',
  closeOnSelect = true,
  disabled = false
}: UseDropdownOptions = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  const open = useCallback(() => {
    if (!disabled) setIsOpen(true)
  }, [disabled])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    isOpen ? close() : open()
  }, [isOpen, open, close])

  const handleSelect = useCallback(() => {
    if (closeOnSelect) close()
  }, [closeOnSelect, close])

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const triggerElement = triggerRef.current
      const contentElement = contentRef.current

      if (
        triggerElement && !triggerElement.contains(target) &&
        contentElement && !contentElement.contains(target)
      ) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, close])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, close])

  // Handle trigger events
  useEffect(() => {
    const triggerElement = triggerRef.current
    if (!triggerElement || disabled) return

    const handlers: { [key: string]: () => () => void } = {
      click: () => {
        triggerElement.addEventListener('click', toggle)
        return () => triggerElement.removeEventListener('click', toggle)
      },
      hover: () => {
        triggerElement.addEventListener('mouseenter', open)
        triggerElement.addEventListener('mouseleave', close)
        return () => {
          triggerElement.removeEventListener('mouseenter', open)
          triggerElement.removeEventListener('mouseleave', close)
        }
      },
      focus: () => {
        triggerElement.addEventListener('focusin', open)
        triggerElement.addEventListener('focusout', close)
        return () => {
          triggerElement.removeEventListener('focusin', open)
          triggerElement.removeEventListener('focusout', close)
        }
      }
    }

    const cleanup = handlers[trigger]?.()
    return cleanup
  }, [trigger, toggle, open, close, disabled])

  return {
    isOpen,
    triggerRef,
    contentRef,
    open,
    close,
    toggle,
    handleSelect
  }
}
