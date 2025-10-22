import { useEffect, useRef } from 'react'
import type { DynModalProps } from '../types/components/dyn-modal.types'
import { useFocusTrap } from '../hooks/use-focus-trap'
import { useKeyboard } from '../hooks/use-keyboard'
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
  const focusTrapRef = useFocusTrap({
    enabled: open,
    initialFocus: true,
    returnFocus: true
  })

  // Handle Escape key
  useKeyboard('Escape', () => {
    if (open) onClose?.()
  }, { enabled: open })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
      // Set focus trap container to dialog
      if (focusTrapRef.current !== dialog) {
        ;(focusTrapRef as any).current = dialog
      }
    } else {
      dialog.close()
    }
  }, [open, focusTrapRef])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose?.()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  const cls = classNames(
    'dyn-modal',
    `dyn-modal--${size}`
  )

  return (
    <dialog
      ref={dialogRef}
      className={cls}
      aria-modal="true"
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
