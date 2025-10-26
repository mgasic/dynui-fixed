import {
  colors as tokenColors,
  radii as tokenRadii,
  shadows as tokenShadows,
  spacing as spacingScale,
  typography as typographyTokens
} from '@dynui/design-tokens'

import type { Theme } from './theme.types'

/**
 * DynUI Default Theme Configuration sourced from the design tokens package.
 * The theme maps semantic slots to token primitives so components can rely on
 * a single source of truth for styling decisions.
 */
export const defaultTheme: Theme = {
  colors: {
    primary: tokenColors.primary,
    gray: tokenColors.neutral,
    danger: tokenColors.semantic.danger,
    success: tokenColors.semantic.success,
    warning: tokenColors.semantic.warning,
    info: tokenColors.semantic.info
  },
  spacing: {
    none: spacingScale.none,
    xxs: spacingScale.xxs,
    xs: spacingScale.xs,
    sm: spacingScale.sm,
    md: spacingScale.md,
    lg: spacingScale.lg,
    xl: spacingScale.xl,
    '2xl': spacingScale['2xl'],
    '3xl': spacingScale['3xl']
  },
  typography: typographyTokens,
  borderRadius: {
    xs: tokenRadii.xs,
    sm: tokenRadii.sm,
    md: tokenRadii.md,
    lg: tokenRadii.lg,
    xl: tokenRadii.xl,
    full: tokenRadii.full
  },
  shadow: {
    xs: tokenShadows.xs,
    sm: tokenShadows.sm,
    md: tokenShadows.md,
    lg: tokenShadows.lg
  }
}
