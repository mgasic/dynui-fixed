import { describe, expect, it } from 'vitest'

import { buildDesignTokenCSS } from '../src/css-generator'
import { colors, spacing, typography } from '../src'

describe('design tokens package', () => {
  it('exposes semantic design tokens for downstream consumers', () => {
    expect(colors.semantic.info[500]).toBe('#3B82F6')
    expect(spacing.md).toBe('1rem')
    expect(spacing['2']).toBe(spacing.sm)
    expect(spacing['6']).toBe(spacing.lg)
    expect(spacing['0.5']).toBe(spacing.xxs)
    expect(spacing['1.5']).toBe('0.375rem')
    expect(typography.fonts.sans).toContain('Inter')
  })

  it('generates CSS variables with normalized keys', () => {
    const css = buildDesignTokenCSS()

    expect(css).toContain('--dyn-color-primary-500: #3878FF;')
    expect(css).toContain('--dyn-spacing-md: 1rem;')
    expect(css).toContain('--dyn-typography-fonts-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;')
    expect(css.startsWith(':root {')).toBe(true)
    expect(css.trim().endsWith('}')).toBe(true)
  })
})
