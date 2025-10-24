import { DynButton, DynContainer, ThemeProvider } from '@dynui/core'
import { colors, spacing } from '@dynui/design-tokens'

function PlaygroundShell() {
  return (
    <DynContainer
      style={{
        padding: spacing['6'],
        backgroundColor: colors.neutral['50'],
        minHeight: '100vh'
      }}
    >
      <header style={{ marginBottom: spacing['6'] }}>
        <h1 style={{ color: colors.primary['600'], marginBottom: spacing['2'] }}>
          DynUI Playground
        </h1>
        <p style={{ color: colors.neutral['600'], maxWidth: 560 }}>
          Lightweight Vite/React host app for manually validating DynUI
          components and tokens during Phase 1.
        </p>
      </header>

      <DynButton variant="primary" size="md">
        Pozdrav iz DynUI biblioteke
      </DynButton>
    </DynContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PlaygroundShell />
    </ThemeProvider>
  )
}
