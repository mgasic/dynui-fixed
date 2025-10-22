import type { Size, Color } from '../common.types'
import type { IconName } from '../../icons/icons.types'

export interface DynIconProps {
  name: IconName
  size?: Size | number
  color?: Color | string
  'aria-label'?: string
  'aria-hidden'?: boolean
  'data-testid'?: string
}