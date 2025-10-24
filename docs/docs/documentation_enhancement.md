# Documentation Enhancement

This document summarises the improvements to developer‑facing documentation described in the enhanced specification (FAZA 9).  Good documentation is essential: it helps users understand your API, shows how to use your components effectively, and answers common questions before they become support tickets.  The following sections outline best practices for documenting components, generating visual assets and maintaining an FAQ.

## API reference tables

For every public component, create a dedicated section in the API reference (e.g. `docs/api-reference.md`) that lists its props, their types, default values and a short description.  Use a table with the following columns:

| Prop        | Type                                      | Default | Required | Description                           |
|-------------|-------------------------------------------|---------|----------|---------------------------------------|
| `variant`   | `'solid' \| 'outline' \| 'ghost'`         | `'solid'` | No       | Visual style of the component.        |
| `size`      | `'sm' \| 'md' \| 'lg'`                   | `'md'`   | No       | Overall size (small, medium, large).  |
| `color`     | `'primary' \| 'success' \| 'danger'`      | `'primary'` | No     | Colour theme for the component.      |
| `loading`   | `boolean`                                 | `false` | No       | Whether to show a loading state.      |
| `disabled`  | `boolean`                                 | `false` | No       | Disable user interaction.             |
| `onClick`   | `(event: MouseEvent) => void`             | –       | No       | Handler invoked on click.             |
| `children`  | `React.ReactNode`                         | –       | Yes      | Content displayed inside the component. |

When documenting a new component, follow this pattern: list every public prop, annotate whether it is required, note the default value (if any) and provide a concise description.  Keep type definitions in sync with your TypeScript declarations so that documentation remains accurate.

## Examples

Accompany each API table with short examples demonstrating typical usage patterns.  These examples should be concise and runnable; users should be able to copy them into their code and see the component working.  For instance:

```tsx
import { DynButton } from '@dynui/core'

// Basic button
export function Example() {
  return <DynButton>Click me</DynButton>
}

// Button with loading state and click handler
export function LoadingExample() {
  const handleSubmit = () => {
    console.log('Submitted')
  }
  return (
    <DynButton loading onClick={handleSubmit}>
      Submit
    </DynButton>
  )
}

// Different variants
export function Variants() {
  return (
    <>
      <DynButton variant="solid">Solid</DynButton>
      <DynButton variant="outline">Outline</DynButton>
      <DynButton variant="ghost">Ghost</DynButton>
    </>
  )
}
```

Examples should be minimal but illustrate the most common use cases.  Avoid overly complex demos; instead, link to the Storybook story if a more elaborate example is needed.

## Accessibility notes

Include an *Accessibility* section for each component describing how it meets WAI‑ARIA guidelines and supports keyboard navigation.  Mention:

* Which ARIA attributes are applied (e.g. `aria-busy`, `aria-disabled` or `aria-describedby`).
* How the component handles focus management and keyboard shortcuts (e.g. pressing `Enter` or `Space` activates a button, pressing `Tab` moves focus correctly).
* Any screen‑reader announcements for loading states or status changes.

Clear accessibility notes help developers build inclusive applications and encourage them to adopt your components.

## Screenshots and GIFs

To make the documentation more visual, generate screenshots or short GIFs of each component in its default state.  Use an automated script (e.g. with Playwright) that launches Storybook, navigates to each story and takes a screenshot:

```ts
// scripts/generate-screenshots.ts
import { chromium } from 'playwright'
import { glob } from 'glob'

async function generateScreenshots() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const stories = await glob('stories/**/*.stories.tsx')
  for (const story of stories) {
    const name = story.match(/\/([^/]+)\.stories/)?.[1]
    await page.goto(`http://localhost:6006/?path=/story/components-${name}--default`)
    await page.screenshot({ path: `docs/screenshots/${name}.png`, fullPage: true })
  }
  await browser.close()
}
```

Run this script after starting Storybook locally.  Store the resulting images in `docs/screenshots/` and embed them in the API reference using Markdown syntax:

```markdown
![DynButton default appearance](screenshots/DynButton.png)
```

If animated interactions are important, generate short GIFs (e.g. showing a dropdown opening) using a similar script with video capture.

## FAQ & troubleshooting

A Frequently Asked Questions section helps users resolve common issues on their own.  Structure the FAQ as a series of questions and answers, grouped by topic.  For example:

### Installation issues

**Q:** I’m seeing peer dependency warnings when installing DynUI.  
**A:** Ensure you have React 18 and React DOM 18 installed:

```bash
pnpm add react@^18.3.1 react-dom@^18.3.1
```

### Usage problems

**Q:** My components aren’t rendering properly.  
**A:** Wrap your app in a `ThemeProvider` from `@dynui/core` to provide design tokens:

```tsx
import { ThemeProvider } from '@dynui/core'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

### Styling and theming

**Q:** My custom styles aren’t applied.  
**A:** Import the default stylesheet from the core package:

```tsx
import '@dynui/core/styles'
```

**Q:** How do I apply a custom theme?  
**A:** Pass a custom theme object to `ThemeProvider`:

```tsx
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

Encourage developers to consult the FAQ before raising issues.  Keep the FAQ updated as new questions arise.

## Maintaining documentation

When you add a new component or modify an existing one, update the API reference and examples accordingly.  Re‑run the screenshot script so that images reflect the current design.  Ensure that any code snippets compile with the latest version of the library.  Good documentation is a living resource; revisit it regularly to keep it accurate and helpful.