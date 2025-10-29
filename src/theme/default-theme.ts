import { colors as colorTokens, spacing as spacingTokens, typography as typographyTokens, radii as radiiTokens, shadows as shadowTokens } from '@dynui/design-tokens'
import type { Theme } from './theme.types'

const { semantic } = colorTokens

const fontSize = Object.fromEntries(
  Object.entries(typographyTokens.sizes).map(([key, value]) => [key, value.fontSize])
)

const lineHeight = Object.fromEntries(
  Object.entries(typographyTokens.sizes).map(([key, value]) => [key, value.lineHeight])
)

const fontWeight = Object.fromEntries(
  Object.entries(typographyTokens.weights).map(([key, value]) => [key, value.toString()])
)

export const defaultTheme: Theme = {
  colors: {
    neutral: { ...colorTokens.neutral },
    info: { ...semantic.info },
    success: { ...semantic.success },
    warning: { ...semantic.warning },
    danger: { ...semantic.danger }
  },
  spacing: { ...spacingTokens },
  borderRadius: { ...radiiTokens },
  typography: {
    fontFamily: typographyTokens.fonts.sans.join(', '),
    fontSize,
    fontWeight,
    lineHeight: {
      ...lineHeight,
      ...Object.fromEntries(
        Object.entries(typographyTokens.lineHeights).map(([key, value]) => [key, value.toString()])
      )
    }
  },
  shadows: { ...shadowTokens }
}
