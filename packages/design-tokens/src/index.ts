/**
 * Core design token definitions for the DynUI system.
 *
 * The shape is intentionally minimal – values will expand alongside
 * color palettes, typography, and spacing scales in later phases.
 */
export const tokens = {
  color: {
    primary: 'hsl(220 90% 56%)',
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(224 70% 12%)'
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  }
} as const;

export type Tokens = typeof tokens;

export default tokens;
