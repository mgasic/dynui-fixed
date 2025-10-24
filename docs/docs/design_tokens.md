# Design Tokens

Design tokens are the atomic values that define the visual identity of your UI library.  They capture colours, spacing, typography and other stylistic constants in a way that is both machine‑readable and human‑friendly.  Using tokens makes your design system scalable and consistent: instead of hard‑coding hex values or pixel sizes throughout components, you reference named values that can be centrally updated.

## Token categories

Our design system organises tokens into the following categories:

* **Colours** – named colour scales used for primary actions, backgrounds, borders and semantic states (e.g. `primary`, `error`, `warning`, `success`).  Each scale contains multiple shades (e.g. `primary.100`, `primary.200` …) to support different UI contexts.
* **Spacing** – a set of integer‐based spacing values (e.g. `0`, `0.5`, `1`, `2`, …) expressed in `rem` units.  Components reference spacing tokens rather than fixed pixel values, making layouts consistent and responsive.
* **Typography** – font families, sizes, weights and line heights.  For example, `fontSizes.sm`, `fontSizes.md`, `fontWeights.semibold`, `lineHeights.tight`.  Using typographic tokens ensures textual elements look uniform across components.

Tokens can also include radii (border radius values), shadows, z‑indices, opacities and any other repeatable constants needed for your UI.

## Defining tokens in TypeScript

Tokens are defined as plain objects in TypeScript/JavaScript.  Below is a simplified example of how you might define colour and spacing tokens:

```ts
// packages/design-tokens/src/colors.ts
export const colors = {
  primary: {
    100: '#E3F2FD',
    200: '#BBDEFB',
    500: '#2196F3',
    700: '#1976D2',
  },
  error: {
    100: '#FFEBEE',
    500: '#F44336',
    700: '#D32F2F',
  },
  // …other colour scales…
} as const

// packages/design-tokens/src/spacing.ts
export const spacing = {
  0: '0rem',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  4: '1rem',
  8: '2rem',
} as const

// packages/design-tokens/src/typography.ts
export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
} as const

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const
```

Each token module exports a strongly typed constant.  Components import these values rather than duplicating literal strings or numbers.  If you need a new token, add it here first rather than hard‑coding values elsewhere.

## Generating CSS variables

To make tokens available in pure CSS (for example, in the consumer’s application), we generate CSS custom properties from the token definitions.  A simple generator could loop through each key and output a style sheet:

```ts
// build/generate-css-vars.ts
import { colors, spacing, fontSizes } from './src/design-tokens'

function toCSSVars(obj: Record<string, any>, prefix = '--du') {
  const lines: string[] = []
  for (const [category, values] of Object.entries(obj)) {
    for (const [name, value] of Object.entries(values)) {
      const varName = `${prefix}-${category}-${name}`
      lines.push(`${varName}: ${value};`)
    }
  }
  return lines.join('\n')
}

const css = `:root {\n${toCSSVars({ colors, spacing, fontSizes })}\n}`
// Write css to dist/design-tokens.css
```

This script flattens the token objects into CSS custom properties like `--du-colors-primary-500` or `--du-spacing-2`.  The resulting CSS file can be imported by users of the library to apply themes without the need for JavaScript.

## Using tokens

Components should reference tokens rather than hard‑coded values.  For example, instead of writing:

```tsx
const Button = () => (
  <button style={{ backgroundColor: '#2196F3', padding: '0.5rem 1rem' }}>
    Click me
  </button>
)
```

you should write:

```tsx
import { colors, spacing } from '@dynui/design-tokens'

const Button = () => (
  <button
    style={{
      backgroundColor: colors.primary[500],
      padding: `${spacing[2]} ${spacing[4]}`,
    }}
  >
    Click me
  </button>
)
```

This approach makes it easy to change the primary colour or spacing scale globally without editing every component.  It also helps the AI agent understand which values are configurable and encourages consistency across the codebase.

## Best practices

* **Do not hard‑code values** – always import tokens from the design‑tokens package or use CSS variables generated from them.
* **Create tokens first** – when you need a new colour, spacing or typography value, add it to the tokens module before using it in components.  This ensures a single source of truth.
* **Keep token names descriptive** – use meaningful names (e.g. `primary`, `error`, `xl`) rather than numbers.  Names help humans and AI infer how a value should be used.
* **Leverage TypeScript for safety** – declare tokens as `as const` so that imports are strongly typed.  This prevents typos and helps autocomplete in editors.

For information on how tokens integrate with our React theming system, see [Theme Provider](theme_provider.md).
