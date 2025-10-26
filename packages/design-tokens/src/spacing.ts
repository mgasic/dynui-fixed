export const spacing = {
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

export type SpacingScale = typeof spacing
