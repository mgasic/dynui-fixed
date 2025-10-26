const namedSpacing = {
  none: '0rem',
  xxs: '0.125rem',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem'
} as const

const legacySpacing = {
  '0': namedSpacing.none,
  '0.5': namedSpacing.xxs,
  '1': namedSpacing.xs,
  '1.5': '0.375rem',
  '2': namedSpacing.sm,
  '3': '0.75rem',
  '4': namedSpacing.md,
  '6': namedSpacing.lg,
  '8': namedSpacing.xl,
  '12': namedSpacing['2xl'],
  '16': namedSpacing['3xl']
} as const

export const spacing = {
  ...namedSpacing,
  ...legacySpacing
} as const

export type SpacingScale = typeof spacing
