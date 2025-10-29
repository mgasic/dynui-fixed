import type { DynModalProps } from '../types/components/dyn-modal.types'
import { classNames } from '../utils'
import { useFocusTrap } from '../hooks'
import { useEffect } from 'react'

export function DynModal({
  children,
  isOpen,
  onClose,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId
}: DynModalProps) {
  const focusTrapRef = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    returnFocus: true 
  })

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const backdropCls = classNames('dyn-modal__backdrop')
  const modalCls = classNames(
    'dyn-modal',
    `dyn-modal--${size}`
  )

  return (
    <div 
      className={backdropCls}
      onClick={closeOnBackdropClick ? onClose : undefined}
      data-testid={dataTestId}
    >
      <div
        ref={focusTrapRef}
        className={modalCls}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}