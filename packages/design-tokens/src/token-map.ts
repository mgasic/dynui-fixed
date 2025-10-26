import { colors } from './colors'
import { radii } from './radii'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { typography } from './typography'

export const tokens = {
  colors,
  spacing,
  typography,
  radii,
  shadows
} as const

export type Tokens = typeof tokens
