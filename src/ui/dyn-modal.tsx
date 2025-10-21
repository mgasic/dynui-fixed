import { useEffect, useRef } from 'react'
import type { DynModalProps } from '../types/components/dyn-modal.types'
import { classNames } from '../utils'

export function DynModal({
  open = false,
  onClose,
  children,
  title,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId
}: DynModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      dialog.showModal()
      // Focus first focusable element
      const firstFocusable = dialog.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()
    } else {
      dialog.close()
      previousFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose?.()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
      }
    }

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('keydown', handleKeyDown)

    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const cls = classNames(
    'dyn-modal',
    `dyn-modal--${size}`
  )

  return (
    <dialog
      ref={dialogRef}
      className={cls}
      aria-label={ariaLabel || title}
      aria-labelledby={ariaLabelledby || (title ? 'modal-title' : undefined)}
      data-testid={dataTestId}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === dialogRef.current) {
          onClose?.()
        }
      }}
    >
      <div className="dyn-modal__content">
        <div className="dyn-modal__header">
          {title && (
            <h2 id="modal-title" className="dyn-modal__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="dyn-modal__close"
            aria-label="Close modal"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="dyn-modal__body">
          {children}
        </div>
      </div>
    </dialog>
  )
}
