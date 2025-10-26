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
  semantic: {
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
    },
    info: {
      100: '#DBEAFE',
      500: '#3B82F6',
      700: '#1D4ED8'
    }
  }
} as const

export type ColorScale = typeof colors.primary
export type NeutralScale = typeof colors.neutral
export type SemanticColorMap = typeof colors.semantic
export type Colors = typeof colors
