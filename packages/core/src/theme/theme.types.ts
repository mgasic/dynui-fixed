import type {
  Colors,
  Radii,
  Shadows,
  SpacingScale,
  Typography,
  Tokens
} from '@dynui/design-tokens'

export type ThemeTokens = Tokens

export type ThemeColors = {
  primary: Colors['primary']
  gray: Colors['neutral']
  danger: Colors['semantic']['danger']
  success: Colors['semantic']['success']
  warning: Colors['semantic']['warning']
  info: Colors['semantic']['info']
}

export interface Theme {
  colors: ThemeColors
  spacing: Pick<SpacingScale, 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
  typography: Typography
  borderRadius: Pick<Radii, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>
  shadow: Pick<Shadows, 'xs' | 'sm' | 'md' | 'lg'>
}

export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}
