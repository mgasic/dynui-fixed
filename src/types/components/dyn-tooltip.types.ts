import type { ReactElement, ReactNode } from 'react'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual'

export interface DynTooltipProps {
  children: ReactElement
  content: ReactNode
  placement?: TooltipPlacement
  trigger?: TooltipTrigger
  delay?: number
  disabled?: boolean
  'data-testid'?: string
}