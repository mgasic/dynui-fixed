import type { Theme } from './theme.types'

export const defaultTheme: Theme = {
  colors: {
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      500: '#6b7280',
      900: '#111827'
    },
    info: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' },
    success: { 50: '#f0fdf4', 500: '#22c55e', 900: '#14532d' },
    warning: { 50: '#fffbeb', 500: '#f59e0b', 900: '#92400e' },
    danger: { 50: '#fef2f2', 500: '#ef4444', 900: '#991b1b' }
  },
  spacing: {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem'
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
}
