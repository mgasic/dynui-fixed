export interface ColorScale {
  50: string
  100: string
  200?: string
  300?: string
  400?: string
  500: string
  600: string
  700: string
  800?: string
  900: string
}

export interface Theme {
  colors: {
    primary: ColorScale
    gray: ColorScale
    danger: Partial<ColorScale>
    success: Partial<ColorScale>
    warning: Partial<ColorScale>
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
  typography: {
    fontFamily: {
      sans: string[]
      mono: string[]
    }
    fontSize: {
      [key: string]: [string, { lineHeight: string }]
    }
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  shadow: {
    sm: string
    md: string
    lg: string
  }
}

export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}