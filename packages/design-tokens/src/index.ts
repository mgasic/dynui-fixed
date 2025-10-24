/**
 * DynUI design tokens - Phase 1 baseline.
 * These values establish the initial theme primitives and will be
 * expanded as the design system matures.
 */
export const colors = {
  primary: {
    50: '#E7F1FF',
    100: '#C7DFFF',
    200: '#A5C9FF',
    300: '#7FAEFF',
    400: '#5A94FF',
    500: '#3878FF',
    600: '#1F5ED9',
    700: '#0F47A8',
    800: '#083079',
    900: '#041B4D'
  },
  neutral: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#0F172A'
  },
  success: {
    100: '#DEF7EC',
    500: '#10B981',
    700: '#047857'
  },
  warning: {
    100: '#FEF3C7',
    500: '#F59E0B',
    700: '#B45309'
  },
  danger: {
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#B91C1C'
  }
} as const

export const spacing = {
  0: '0rem',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem'
} as const

export const radii = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px'
} as const

export const fontFamilies = {
  sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
} as const

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem'
} as const

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const

export const lineHeights = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65
} as const

export const tokens = {
  colors,
  spacing,
  radii,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights
}

export type Tokens = typeof tokens
