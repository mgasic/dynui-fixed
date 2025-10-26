export const shadows = {
  xs: '0 1px 2px 0 rgb(15 23 42 / 0.08)',
  sm: '0 1px 3px 0 rgb(15 23 42 / 0.12)',
  md: '0 4px 6px -1px rgb(15 23 42 / 0.15)',
  lg: '0 10px 15px -3px rgb(15 23 42 / 0.2)'
} as const

export type Shadows = typeof shadows
