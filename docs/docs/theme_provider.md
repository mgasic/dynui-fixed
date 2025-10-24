# Theme Provider

A **Theme Provider** makes design tokens available to React components via context.  Rather than importing tokens directly in every component, the theme provider supplies a single `theme` object that contains all tokens (colours, spacing, typography, etc.).  Components can consume this context to obtain the current theme values, enabling support for multiple themes (e.g. light/dark) and user customisation.

## Creating a theme context

Below is a simplified implementation of a theme provider using React.  It imports the tokens from the design‑tokens package, constructs a theme object, and exposes it via React context:

```tsx
// packages/core/src/theme/theme-context.tsx
import React, { createContext, useContext } from 'react'
import { colors, spacing, fontSizes, fontWeights } from '@dynui/design-tokens'

export interface Theme {
  colors: typeof colors
  spacing: typeof spacing
  fontSizes: typeof fontSizes
  fontWeights: typeof fontWeights
  // …add other token categories as needed
}

const ThemeContext = createContext<Theme | null>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = { colors, spacing, fontSizes, fontWeights }
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be called within a ThemeProvider')
  }
  return ctx
}
```

The `ThemeProvider` component should wrap your application (or the part of your app that uses DynUI components).  Components inside the provider can call `useTheme()` to access token values.

## Consuming the theme in components

Here's how a component might use the theme context instead of hard‑coding values:

```tsx
import React from 'react'
import { useTheme } from './theme-context'

export function Alert({ variant, children }: { variant: 'error' | 'warning' | 'success'; children: React.ReactNode }) {
  const theme = useTheme()
  const background = theme.colors[variant][100]
  const textColor = theme.colors[variant][700]
  const padding = theme.spacing[2]

  return (
    <div style={{ backgroundColor: background, color: textColor, padding }}>
      {children}
    </div>
  )
}
```

By reading values from the theme, the component automatically adapts when a different theme is provided.  This pattern allows for flexible theming and centralised style management.

## Supporting multiple themes

If your design system needs multiple themes (e.g. light and dark), define separate token sets and select the appropriate one in the provider:

```tsx
const lightTheme = { colors: lightColors, spacing, fontSizes, fontWeights }
const darkTheme = { colors: darkColors, spacing, fontSizes, fontWeights }

export const ThemeProvider: React.FC<{ mode?: 'light' | 'dark'; children: React.ReactNode }> = ({ mode = 'light', children }) => {
  const theme = mode === 'dark' ? darkTheme : lightTheme
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
```

Consumers can now switch themes by changing the `mode` prop.  For even more dynamic themes, you could accept a custom theme object or merge overrides into the base tokens.

## Best practices

* **Always wrap DynUI components with `ThemeProvider`** – components that call `useTheme()` will throw if they are not within the provider.
* **Do not mutate the theme** – the theme object should be immutable.  If you need to customise values, provide a new theme object rather than modifying the existing one.
* **Use context hooks, not direct imports** – when building components in the core package, prefer `useTheme()` over importing tokens directly.  This ensures components will respect any user‑provided themes.
* **Document your themes** – explain what tokens are available and how to override them.  Storybook stories should demonstrate different theme modes if applicable.

For more information about the tokens themselves, see [Design Tokens](design_tokens.md).  For guidance on enforcing quality in theme usage and other contributions, see [Quality Gates](quality_gates.md).
