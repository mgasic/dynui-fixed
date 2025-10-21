export interface Theme {
  colors: {
    neutral: Record<string, string>
    info: Record<string, string>
    success: Record<string, string>
    warning: Record<string, string>
    danger: Record<string, string>
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  typography: {
    fontFamily: string
    fontSize: Record<string, string>
    fontWeight: Record<string, string>
    lineHeight: Record<string, string>
  }
  shadows: Record<string, string>
}

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}
