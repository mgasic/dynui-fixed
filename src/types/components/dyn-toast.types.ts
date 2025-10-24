import type { ReactNode } from 'react'
import type { Color } from '../common.types'

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
export type ToastType = Color | 'loading'

export interface ToastItem {
  id: string
  title?: string
  message: string
  type?: ToastType
  duration?: number
  closable?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export interface DynToastProps {
  toast: ToastItem
  onClose?: (id: string) => void
}

export interface DynToastProviderProps {
  children: ReactNode
  position?: ToastPosition
  maxToasts?: number
}