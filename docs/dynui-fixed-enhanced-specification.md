
## Detaljno Specifikacija po Fazama



### FAZA 1: Package Management, Infrastructure, Standardizacija, Monorepo Struktura Reorganizacija (KRITIČNO - 3 dana)

#### 1.1 PNPM Workspace Setup

**Cilj**: Centralizovano upravljanje dependency versions kroz catalog system

**`pnpm-workspace.yaml`**:

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - '.'

catalog:
  # Core React Ecosystem - Stabilne verzije
  react: ^18.3.1
  react-dom: ^18.3.1
  '@types/react': ^18.3.12
  '@types/react-dom': ^18.3.1

  # TypeScript Ecosystem - LTS verzije
  typescript: ^5.6.3
  '@types/node': ^20.17.6

  # Build & Development Tools
  vite: ^5.4.10
  tsup: ^8.3.5
  '@vitejs/plugin-react': ^4.3.3

  # Testing Stack - Stabilne 2.x verzije
  vitest: ^2.1.5
  '@testing-library/react': ^16.0.1
  '@testing-library/jest-dom': ^6.6.3
  '@testing-library/user-event': ^14.5.2
  jsdom: ^25.0.1
  vitest-axe: ^0.1.0

  # Storybook - Stabilna 8.x serija
  storybook: ^8.3.5
  '@storybook/addon-a11y': ^8.3.5
  '@storybook/addon-essentials': ^8.3.5
  '@storybook/react-vite': ^8.3.5
  chromatic: ^11.12.6

  # Code Quality
  eslint: ^9.15.0
  prettier: ^3.3.3
  '@typescript-eslint/parser': ^8.15.0
  '@typescript-eslint/eslint-plugin': ^8.15.0

onlyBuiltDependencies:
  - '@parcel/watcher'
  - 'esbuild'

peerDependencyRules:
  allowedVersions:
    react: '18'
    react-dom: '18'
```

#### 1.2 `.npmrc` Standardizacija

```ini
# Performance optimizations
prefer-frozen-lockfile=true
auto-install-peers=true
strict-peer-dependencies=false

# Security & Registry
audit-level=moderate
registry=https://registry.npmjs.org/

# Package management
save-exact=false
save-prefix=^
engine-strict=true

# Workspace config
link-workspace-packages=true
prefer-workspace-packages=true

# CI optimizations
frozen-lockfile=true
```

#### 1.3 Package.json Refactoring

**Ažuriranje sa catalog references:**

```json
{
  "name": "@dynui/fixed-monorepo",
  "version": "1.0.0",
  "type": "module",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "pnpm run --recursive --stream build",
    "test": "pnpm run --recursive --parallel test",
    "typecheck": "pnpm run --recursive --parallel typecheck",
    "lint": "pnpm run --recursive --parallel lint"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vitest": "catalog:",
    "storybook": "catalog:",
    "eslint": "catalog:",
    "prettier": "catalog:"
  },
  "packageManager": "pnpm@9.12.0"
}
```

#### 1.4 Monorepo Struktura Reorganizacija

```bash
# Nova struktura
/
├── packages/
│   ├── core/                # Glavna biblioteka komponenti
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── design-tokens/       # Design system tokeni
│   │   ├── src/
│   │   ├── build/
│   │   └── package.json
│   └── icons/              # Icon biblioteka
│       ├── src/
│       └── package.json
├── apps/
│   ├── storybook/          # Storybook app
│   └── playground/         # Development playground
├── tools/
│   ├── build-config/       # Shared build config
│   └── eslint-config/      # Shared ESLint config
├── pnpm-workspace.yaml
├── .npmrc
├── turbo.json             # Build orchestration
└── package.json
```

---

### FAZA 2: TypeScript i Build System Optimizacija (VISOKO - 2 dana)

#### 2.1 Unified TypeScript Configuration

**Root `tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    
    // Strict type checking
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    
    // Module handling
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    
    // Output
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    
    // JSX
    "jsx": "react-jsx"
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

**Package-specific configs**:

```json
// packages/core/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@dynui/design-tokens": ["../design-tokens/src"],
      "@dynui/icons": ["../icons/src"]
    }
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../design-tokens" },
    { "path": "../icons" }
  ]
}
```

#### 2.2 Build System sa Turbo

**`turbo.json`**:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", "storybook-static/**"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "package.json", "tsconfig*.json"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "tests/**/*.ts", "tests/**/*.tsx"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "*.json", "*.js", "*.ts"]
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "tsconfig*.json"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test:a11y": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "tests/**/*.ts", "tests/**/*.tsx"]
    },
    "clean": {
      "cache": false
    },
    "storybook": {
      "cache": false,
      "persistent": true
    },
    "build:storybook": {
      "dependsOn": ["^build"],
      "outputs": ["storybook-static/**"]
    }
  }
}
```

#### 2.3 Standardizacija Storybook-a, Accessibility i Quality Gates

**Cilj:** Disciplinovano, automatski verifikovati sve aspekte kvaliteta kroz GitHub Actions, turbo orkestraciju i moderni monorepo pristup korišćenjem apps/storybook, CSF args/controls i test-runnera.

##### Storybook Setup

- **Lokacija:** `apps/storybook` (zasebna aplikacija)
- **Builder:** `@storybook/react-vite`
- **Konvencije za stories:**
  - CSF 3 format, .stories.tsx po komponenti
  - Export default meta plus varijante sa args/controls
  - Pokriti: default, error, disabled, RTL, dark, keyboard/focus, edge cases

**Primer:**

```tsx
// packages/core/src/ui/dyn-input.stories.tsx
import { DynInput } from "./dyn-input"
export default {
  title: "Form/DynInput",
  component: DynInput,
  parameters: { a11y: { test: 'todo' } }
}
export const Default = { args: { label: "Email", required: true }}
export const Error = { args: { label: "Email", error: "Invalid!" }}
export const RTL = { args: { label: "Email", style: { direction: "rtl" }}}
```

**Konfiguracija:**

- `.storybook/main.ts`: stories glob, addons essentials, a11y, interactions
- `.storybook/preview.ts`: ThemeProvider, decorators, parameters.a11y.test ('todo' local/ 'error' CI)

**Build/test komande:**

- `pnpm storybook`, `pnpm build:storybook`, `pnpm test-storybook`
- CI korak: build storybook & test-runner, artefakt: storybook-static

##### Quality Gates

- **Gate A:** Static analysis (eslint, prettier, typecheck) - fail on error
- **Gate B:** Test coverage ≥ 80% (unit, integration), enforced u vitest.config
- **Gate C:** Accessibility (Storybook test-runner/axe): parameters.a11y.test='error' u CI, izuzetke dokumentovati na nivou priče
- **Gate D:** Bundle limit < 150KB za @dynui/core, tree-shakeability proveriti
- **Gate E:** Vizuelna regresija - workflow spreman (Chromatic aktivan u FAZA 8)

**Primer CI koraka:**

```yaml
jobs:
  gate-c:
    name: Gate C - Accessibility Testing
    steps:
      - run: pnpm build:storybook
      - run: |
          pnpm dlx serve storybook-static -p 6006 &
          sleep 10
          pnpm dlx @storybook/test-runner --url http://localhost:6006
```

##### CI/CD Workflow & Artefakti

- Turbo orchestration: storybook-static kao output
- PR mora proći sve gates pre merge
- Artefakti: storybook-static, coverage, bundle reports, test logs

##### Definition of Done

- apps/storybook aktivan, stories standardizovane, CI pipeline verifikuje quality gates (A-D) na PRu i na main/develop; Gate E blokira merge tek u FAZA 8 kad Chromatic baseline bude aktivan

---

### FAZA 3: Design Tokens System (KRITIČNO - 3 dana) 🆕 **PRIORITET POVEĆAN NA P0**

#### 🔴 KRITIČNO: Ova faza je identifikovana kao BLOCKER u analizi

**Razlog povećanja prioriteta:**

- Specifikacija FAZA 3 eksplicitno zahteva design tokens paket
- Trenutno ne postoji `packages/design-tokens/` direktorijum
- Blokira konzistentnost dizajna i cross-package sharing
- Gap između claimed i actual implementacije

#### 3.1 Design Tokens Struktura

```typescript
// packages/design-tokens/src/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  }
} as const

// packages/design-tokens/src/spacing.ts
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
} as const

// packages/design-tokens/src/typography.ts
export const typography = {
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'JetBrains Mono, Monaco, Consolas, monospace'
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem', 
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  }
} as const
```

#### 3.2 CSS Variables Generation

```typescript
// packages/design-tokens/build/generate-css.ts
import { colors, spacing, typography } from '../src'

function generateCSSVariables() {
  const css = [
    ':root {',
    ...Object.entries(colors.primary).map(([key, value]) => 
      `  --dyn-color-primary-${key}: ${value};`
    ),
    ...Object.entries(spacing).map(([key, value]) => 
      `  --dyn-spacing-${key}: ${value};`
    ),
    '}'
  ].join('\n')
  
  return css
}
```

#### 3.3 Theme System Integration

```typescript
// packages/core/src/theme/theme-provider.tsx
import { createContext, useContext, ReactNode } from 'react'
import { colors, spacing, typography } from '@dynui/design-tokens'

interface Theme {
  colors: typeof colors
  spacing: typeof spacing
  typography: typeof typography
}

const ThemeContext = createContext<Theme | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = { colors, spacing, typography }
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return theme
}
```

---

### FAZA 4: Quality Gates i CI/CD Stabilizacija (KRITIČNO - 2 dana)

#### 🆕 DOPUNJENO: Rezultati analize Quality Gates

**Trenutno stanje po gate-ovima:**

- Gate A (Static Analysis): 100% ✅
- Gate B (Unit Tests): 70% ⚠️ - coverage nije verifikovan
- Gate C (Accessibility): 95% ✅
- Gate D (Bundle Analysis): 50% ❌ - monitoring nedostaje
- Gate E (Visual Regression): 40% ❌ - Chromatic nije integrisan

**Prioritet za stabilizaciju:** P0-BLOCKER

#### 4.1 GitHub Actions Workflow

**`.github/workflows/quality-gates.yml`**:

```yaml
name: Quality Gates Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Gate A: Static Analysis (100% ✅)
  gate-a:
    name: Gate A - Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: TypeScript Check
        run: pnpm typecheck
      
      - name: ESLint
        run: pnpm lint
      
      - name: Prettier Check
        run: pnpm format:check

  # Gate B: Testing (70% ⚠️ - NEEDS VERIFICATION)
  gate-b:
    name: Gate B - Unit & Integration Tests
    runs-on: ubuntu-latest
    needs: gate-a
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run Tests with Coverage
        run: pnpm test --coverage
      
      - name: 🆕 Coverage Gate (80% minimum) - ENFORCED
        run: |
          COVERAGE=$(pnpm test --coverage --silent | grep "All files" | awk '{print $4}' | sed 's/%//')
          if [ "$COVERAGE" -lt "80" ]; then
            echo "❌ Coverage $COVERAGE% is below 80% threshold"
            exit 1
          else
            echo "✅ Coverage $COVERAGE% meets 80% threshold"
          fi
      
      - name: 🆕 Upload Coverage Reports
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          fail_ci_if_error: true

  # Gate C: Accessibility (95% ✅)
  gate-c:
    name: Gate C - Accessibility Testing
    runs-on: ubuntu-latest
    needs: gate-a
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: A11y Tests
        run: pnpm test:a11y
      
      - name: Build Storybook
        run: pnpm build:storybook
      
      - name: Serve & Test Storybook A11y
        run: |
          pnpm dlx serve storybook-static -p 6006 &
          sleep 10
          pnpm dlx @storybook/test-runner --url http://localhost:6006

  # Gate D: Bundle Analysis (50% ❌ - NEEDS IMPLEMENTATION)
  gate-d:
    name: Gate D - Bundle & Performance
    runs-on: ubuntu-latest
    needs: gate-a
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build packages
        run: pnpm build
      
      - name: 🆕 Bundle Size Analysis - AUTOMATED
        run: |
          BUNDLE_SIZE=$(du -sk packages/core/dist | cut -f1)
          MAX_SIZE=150  # 150KB limit
          if [ "$BUNDLE_SIZE" -gt "$MAX_SIZE" ]; then
            echo "❌ Bundle size ${BUNDLE_SIZE}KB exceeds ${MAX_SIZE}KB limit"
            exit 1
          else
            echo "✅ Bundle size ${BUNDLE_SIZE}KB within ${MAX_SIZE}KB limit"
          fi
      
      - name: 🆕 Tree-shaking Verification
        run: |
          echo "import { DynButton } from '@dynui/core'" > test-treeshake.js
          pnpm dlx esbuild test-treeshake.js --bundle --minify --outfile=test-bundle.js
          SIZE=$(wc -c < test-bundle.js)
          echo "Single component bundle: ${SIZE} bytes"
          rm test-treeshake.js test-bundle.js
      
      - name: 🆕 Bundle Analysis Report
        uses: vio/action-bundle-analyzer@v1
        with:
          upload: true

  # Gate E: Visual Regression (40% ❌ - NEEDS CHROMATIC)
  gate-e:
    name: Gate E - Visual Regression
    runs-on: ubuntu-latest
    needs: [gate-b]
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build Storybook
        run: pnpm build:storybook
      
      - name: 🆕 Run Chromatic - REQUIRED
        uses: chromaui/action@v11
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          exitZeroOnChanges: false
          autoAcceptChanges: false
```

#### 4.2 Test Coverage i Quality Metrics

```typescript
// vitest.config.ts - 🆕 Enhanced configuration sa enforced thresholds
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: [
      'packages/*/tests/**/*.test.{ts,tsx}',
      'packages/*/src/**/*.test.{ts,tsx}'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        global: {
          statements: 80,  // 🆕 ENFORCED
          branches: 80,    // 🆕 ENFORCED
          functions: 80,   // 🆕 ENFORCED
          lines: 80        // 🆕 ENFORCED
        }
      },
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        'tests/setup.ts'
      ]
    }
  }
})
```

#### 4.3 Pre-commit Hooks Setup

**`.husky/pre-commit`**:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Type checking
pnpm typecheck || (echo "❌ TypeScript errors found" && exit 1)

# Linting
pnpm lint || (echo "❌ ESLint errors found" && exit 1)

# Format check
pnpm format:check || (echo "❌ Prettier formatting issues found" && exit 1)

# Unit tests for changed files
pnpm test --run --changed || (echo "❌ Tests failing" && exit 1)

echo "✅ Pre-commit checks passed!"
```

---

### FAZA 5: Advanced Testing Infrastructure (SREDNJE - 2 dana)

#### 5.1 Comprehensive Component Testing

```typescript
// packages/core/tests/components/dyn-button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DynButton } from '../../src/ui/dyn-button'

expect.extend(toHaveNoViolations)

describe('DynButton', () => {
  // Functional Testing
  it('renders with correct text', () => {
    render(<DynButton>Click me</DynButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<DynButton onClick={handleClick}>Click me</DynButton>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // Accessibility Testing
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynButton aria-label="Test button">Click me</DynButton>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  // Keyboard Navigation Testing
  it('supports keyboard navigation', async () => {
    const handleClick = vi.fn()
    render(<DynButton onClick={handleClick}>Click me</DynButton>)
    
    const button = screen.getByRole('button')
    button.focus()
    
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()
    
    await userEvent.keyboard('{Space}')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  // Visual States Testing
  it('applies correct variant styles', () => {
    const { rerender } = render(<DynButton variant="solid">Solid</DynButton>)
    expect(screen.getByRole('button')).toHaveClass('dyn-button--solid')
    
    rerender(<DynButton variant="outline">Outline</DynButton>)
    expect(screen.getByRole('button')).toHaveClass('dyn-button--outline')
  })

  // Loading State Testing
  it('displays loading state correctly', () => {
    render(<DynButton loading>Loading</DynButton>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
})
```

#### 5.2 Integration Testing

```typescript
// packages/core/tests/integration/form-workflow.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DynInput } from '../../src/ui/dyn-input'
import { DynButton } from '../../src/ui/dyn-button'
import { DynFieldContainer } from '../../src/ui/dyn-field-container'

describe('Form Components Integration', () => {
  it('handles complete form workflow', async () => {
    const handleSubmit = vi.fn()
    
    render(
      <form onSubmit={handleSubmit}>
        <DynFieldContainer label="Email" error="">
          <DynInput type="email" name="email" />
        </DynFieldContainer>
        
        <DynFieldContainer label="Password" error="">
          <DynInput type="password" name="password" />
        </DynFieldContainer>
        
        <DynButton type="submit">Submit</DynButton>
      </form>
    )
    
    // Fill out form
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    
    expect(handleSubmit).toHaveBeenCalled()
  })
})
```

#### 5.3 Test Piramida, Accessibility i Interaction Testing

**Cilj:** Potpuni test pyramid (unit, integracija, play/interaction, a11y) uz standardized test slučajeve i strukturu.

##### Standardi Pokrivenosti i Lokacija Testova

- **Unit:** `packages/core/src/**/*.test.ts(x)`
- **Integracija:** `packages/core/tests/integration/**/*.test.ts(x)`
- **Stories:** `.stories.tsx` (CSF args/controls + barem jedan play/interaction)

**Primer:**

```typescript
// packages/core/tests/components/dyn-input.test.tsx
import { render, screen } from '@testing-library/react'
import { DynInput } from '../../src/ui/dyn-input'

describe('DynInput', () => {
  it('renders label', () => {
    render(<DynInput label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
  
  it('throws validation error', () => {
    render(<DynInput label="Email" required validation={[{type:'email', message:'Invalid'}]} />)
    screen.getByLabelText('Email').value = 'notemail'
    fireEvent.blur(screen.getByLabelText('Email'))
    expect(screen.getByText('Invalid')).toBeVisible()
  })
})
```

##### Obavezni test scenariji

- Render, props (disabled/loading/state), events (onChange/onClick/keyboard navigation)
- Accessibility: jest-axe/vitest-axe, plus Storybook test-runner (axe-playwright)
- Play/interaction: upis/klik/error case kroz play funkciju u priči
- Coverage prag: ≥80% global (critical path branch ≥85%)

##### Tooling & Setup

- Vitest config: thresholds enforced, environment jsdom
- Helper: test-utils wrapper (ThemeProvider, tokens)
- Skripte: `pnpm test`, `pnpm test:watch`, `pnpm test:a11y`, `pnpm storybook`, `pnpm test-storybook`
- CI: Gate B/C paralelno

##### Definition of Done

- Kritični UI i hooks pokriveni funkcionalnim i accessibility testom
- Coverage ≥ 80% u CI
- Stories prolaze axe (default/error/RTL)
- Play/interaction scenario za ključne komponente i edge cases

---

---

### FAZA 6: Production Release Preparation (NIZAK - 2 dana)

#### 6.1 NPM Publishing Setup

```json
// packages/core/package.json
{
  "name": "@dynui/core",
  "version": "1.0.0",
  "description": "DynUI Component Library - Production Ready",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": ["dist", "README.md"],
  "sideEffects": ["**/*.css"],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/mgasic/dynui-fixed.git",
    "directory": "packages/core"
  },
  "keywords": [
    "react",
    "component-library", 
    "typescript",
    "accessibility",
    "design-system"
  ],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

#### 6.2 Documentation Generation

```typescript
// tools/docs-generator/generate-api-docs.ts
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import { parse } from '@typescript-eslint/typescript-estree'

interface ComponentDoc {
  name: string
  props: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
}

async function generateAPIDocs() {
  const componentFiles = await glob('packages/core/src/ui/*.tsx')
  const docs: ComponentDoc[] = []
  
  for (const file of componentFiles) {
    const content = readFileSync(file, 'utf-8')
    const ast = parse(content, { jsx: true })
    
    // Extract component info from AST
    const componentDoc = extractComponentInfo(ast, file)
    docs.push(componentDoc)
  }
  
  // Generate markdown documentation
  const markdown = generateMarkdown(docs)
  writeFileSync('docs/api-reference.md', markdown)
}
```

---

### 🆕 FAZA 7: Verifikacija i Validacija (KRITIČNO - 2 dana)

**Nova faza dodana na osnovu nalaza asistentske kuće**

#### 7.1 Claimed Metrics Verification

**Checklist za verifikaciju:**

```bash
# 1. Test Coverage Verification
echo "📊 Verifying test coverage..."
pnpm test --coverage
COVERAGE=$(grep -oP 'All files.*?\K\d+' coverage/coverage-summary.json | head -1)
if [ "$COVERAGE" -ge "80" ]; then
  echo "✅ Test coverage: ${COVERAGE}% (>= 80%)"
else
  echo "❌ Test coverage: ${COVERAGE}% (< 80%)"
  exit 1
fi

# 2. TypeScript Zero Errors Verification  
echo "🔍 Verifying zero TypeScript errors..."
pnpm typecheck 2>&1 | tee typecheck.log
ERROR_COUNT=$(grep -c "error TS" typecheck.log || echo 0)
if [ "$ERROR_COUNT" -eq "0" ]; then
  echo "✅ Zero TypeScript errors confirmed"
else
  echo "❌ Found ${ERROR_COUNT} TypeScript errors"
  exit 1
fi

# 3. Bundle Size Verification
echo "📦 Verifying bundle size <150KB..."
pnpm build
BUNDLE_SIZE=$(du -sk packages/core/dist | cut -f1)
if [ "$BUNDLE_SIZE" -lt "150" ]; then
  echo "✅ Bundle size: ${BUNDLE_SIZE}KB (< 150KB)"
else
  echo "❌ Bundle size: ${BUNDLE_SIZE}KB (>= 150KB)"
  exit 1
fi

# 4. Quality Gates Verification
echo "🚪 Verifying all quality gates..."
pnpm run gate:all
```

#### 7.2 Real-world Validation

**Dogfooding aplikacija:**

```typescript
// apps/validation-app/src/App.tsx
import { useState } from 'react'
import {
  DynButton,
  DynInput,
  DynSelect,
  DynCheckbox,
  DynTabs,
  DynTab,
  DynTabPanel,
  ThemeProvider
} from '@dynui/core'

export function ValidationApp() {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    terms: false
  })

  return (
    <ThemeProvider>
      <div className="app">
        <h1>DynUI Validation App</h1>
        
        <DynTabs defaultValue="form">
          <DynTab item={{ key: 'form', value: 'form', label: 'Form Demo' }} />
          <DynTab item={{ key: 'components', value: 'components', label: 'Components' }} />
          
          <DynTabPanel item={{ key: 'form', value: 'form', label: 'Form Demo' }}>
            <form>
              <DynInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
              
              <DynSelect
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </DynSelect>
              
              <DynCheckbox
                checked={formData.terms}
                onChange={(checked) => setFormData({ ...formData, terms: checked })}
              >
                I agree to terms
              </DynCheckbox>
              
              <DynButton type="submit">Submit</DynButton>
            </form>
          </DynTabPanel>
        </DynTabs>
      </div>
    </ThemeProvider>
  )
}
```

#### 7.3 External Code Review Setup

```markdown
# CODE_REVIEW_CHECKLIST.md

## Pre-review Requirements
- [ ] All Quality Gates passing
- [ ] Test coverage >= 80%
- [ ] Bundle size < 150KB
- [ ] Zero TypeScript errors
- [ ] Accessibility tests passing

## Review Areas

### Architecture
- [ ] Monorepo struktura je logična i maintainable
- [ ] Package dependencies su properly defined
- [ ] TypeScript konfiguracija je optimal

### Component Quality
- [ ] Components follow React best practices
- [ ] Proper forwardRef usage
- [ ] Controlled/uncontrolled patterns correct
- [ ] ARIA attributes properly implemented

### Testing
- [ ] Unit tests comprehensive
- [ ] Integration tests cover workflows
- [ ] A11y tests cover all components
- [ ] Edge cases handled

### Documentation
- [ ] API reference complete
- [ ] Usage examples clear
- [ ] Migration guide available
- [ ] FAQ addresses common issues

## External Reviewers
- [ ] React community expert
- [ ] A11y specialist
- [ ] TypeScript expert
- [ ] Build/tooling specialist
```

---

### 🆕 FAZA 8: Visual Regression & NPM Publish (VISOKO - 3 dana)

**Nova faza za addressing Gate E i distribution gaps**

#### 8.1 Chromatic Integration

```yaml
# .github/workflows/chromatic.yml
name: Chromatic Visual Regression

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build Storybook
        run: pnpm build:storybook
      
      - name: Publish to Chromatic
        uses: chromaui/action@v11
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          exitZeroOnChanges: false
          autoAcceptChanges: ${{ github.ref == 'refs/heads/main' }}
```

#### 8.2 Playwright Cross-browser Testing

```typescript
// tests/e2e/component-rendering.spec.ts
import { test, expect } from '@playwright/test'

test.describe('DynButton Cross-browser', () => {
  test('renders correctly in Chrome', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-dynbutton--default')
    await expect(page.locator('button')).toBeVisible()
  })

  test('handles click events in Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox')
    await page.goto('http://localhost:6006/?path=/story/components-dynbutton--default')
    await page.click('button')
    // Verify click handling
  })

  test('keyboard navigation in Safari', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit')
    await page.goto('http://localhost:6006/?path=/story/components-dynbutton--default')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    // Verify keyboard handling
  })
})
```

#### 8.3 NPM Automated Publishing

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 9.12.0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run all quality gates
        run: pnpm run gate:all
      
      - name: Build packages
        run: pnpm build
      
      - name: Publish to NPM
        run: pnpm publish --recursive --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub Release Assets
        uses: softprops/action-gh-release@v1
        with:
          files: |
            packages/core/dist/**
            packages/design-tokens/dist/**
```

#### 8.4 Semantic Versioning Automation

```json
// .releaserc.json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

---

### 🆕 FAZA 9: Documentation Enhancement (SREDNJE - 2 dana)

**Addressing documentation gaps iz analize**

#### 9.1 API Reference Tables

```markdown
# API Reference - DynButton

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | No | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `color` | `'primary' \| 'success' \| 'danger'` | `'primary'` | No | Button color |
| `loading` | `boolean` | `false` | No | Show loading state |
| `disabled` | `boolean` | `false` | No | Disable button |
| `onClick` | `(e: MouseEvent) => void` | - | No | Click handler |
| `children` | `ReactNode` | - | Yes | Button content |

## Examples

### Basic Usage

\```tsx
import { DynButton } from '@dynui/core'

export function Example() {
  return <DynButton>Click me</DynButton>
}
\```

### With Loading State

\```tsx
<DynButton loading onClick={() => console.log('Clicked')}>
  Submit
</DynButton>
\```

### Different Variants

\```tsx
<DynButton variant="solid">Solid</DynButton>
<DynButton variant="outline">Outline</DynButton>
<DynButton variant="ghost">Ghost</DynButton>
\```

## Accessibility

- Supports keyboard navigation (Enter, Space)
- ARIA attributes: `aria-busy`, `aria-disabled`
- Focus management with proper focus styles
- Screen reader announcements for loading states
```

#### 9.2 Screenshots & GIFs

```bash
# scripts/generate-screenshots.ts
import { chromium } from 'playwright'
import { glob } from 'glob'

async function generateScreenshots() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  const stories = await glob('stories/**/*.stories.tsx')
  
  for (const story of stories) {
    const componentName = story.match(/\/([^/]+)\.stories/)?.[1]
    await page.goto(`http://localhost:6006/?path=/story/components-${componentName}--default`)
    await page.screenshot({
      path: `docs/screenshots/${componentName}.png`,
      fullPage: true
    })
  }
  
  await browser.close()
}
```

#### 9.3 FAQ & Troubleshooting

```markdown
# FAQ & Troubleshooting

## Installation Issues

### Q: Getting peer dependency warnings?
**A:** Ensure you have React 18+ installed:
\```bash
pnpm add react@^18.3.1 react-dom@^18.3.1
\```

### Q: TypeScript errors after installation?
**A:** Make sure your `tsconfig.json` includes:
\```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
\```

## Component Usage

### Q: Components not rendering?
**A:** Wrap your app with ThemeProvider:
\```tsx
import { ThemeProvider } from '@dynui/core'

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  )
}
\```

### Q: Keyboard navigation not working?
**A:** Ensure you've imported the accessibility hooks and components have proper focus management.

## Styling Issues

### Q: Styles not applying?
**A:** Import the CSS file:
\```tsx
import '@dynui/core/styles'
\```

### Q: Custom theme not working?
**A:** Pass your theme to ThemeProvider:
\```tsx
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
\```
```

#### 9.4 Migration Guide

```markdown
# Migration Guide: Original DynUI → DynUI-Fixed

## Breaking Changes

### 1. Import Paths Changed

**Before:**
\```tsx
import { Button } from 'dynui'
\```

**After:**
\```tsx
import { DynButton } from '@dynui/core'
\```

### 2. Theme Provider Required

**Before:**
\```tsx
// No provider needed
<Button>Click</Button>
\```

**After:**
\```tsx
import { ThemeProvider, DynButton } from '@dynui/core'

<ThemeProvider>
  <DynButton>Click</DynButton>
</ThemeProvider>
\```

### 3. Prop Changes

| Component | Old Prop | New Prop | Notes |
|-----------|----------|----------|-------|
| Button | `style` | `variant` | Renamed for clarity |
| Input | `icon` | `startIcon` / `endIcon` | More flexible positioning |
| Select | `options` | Children | Use DynSelectOption |

## Step-by-Step Migration

1. **Install new package**
   \```bash
   pnpm remove dynui
   pnpm add @dynui/core @dynui/design-tokens
   \```

2. **Update imports**
   - Find/replace all `from 'dynui'` → `from '@dynui/core'`
   - Update component names (add `Dyn` prefix)

3. **Add ThemeProvider**
   - Wrap root component with ThemeProvider

4. **Update prop usage**
   - Refer to breaking changes table above

5. **Test thoroughly**
   - Run test suite
   - Manual testing of all components
```

---

### 🆕 FAZA 10: Microservices Layer (OPCIONO - 6-8 sedmica)

**Low priority - samo nakon community validation**

**Razlog za P3-LOW prioritet:**

- Core library mora biti stabilan i validiran pre arhitektonskog proširenja
- Hybrid arhitektura je preambiciozna bez traction
- Community adoption je trenutno minimalna (0 stars, 1 fork)

**Prerequisites:**

- ✅ Core library published na NPM
- ✅ >100 GitHub stars
- ✅ Active community adoption
- ✅ Verified production usage
- ✅ External validation i feedback

**Arhitektura:**

- Config service za runtime configuration
- Theme service za dynamic theming
- AB testing service
- Analytics service
- Integration sa backend systems

*Detalji se razvijaju nakon ispunjenja prerequisites*

---

## 🆕 NOVA SEKCIJA: Implementacijski Redosled i Timeline

### Kritični Put (MORA SE ZAVRŠITI PRVO)

| Faza | Prioritet | Trajanje | Blockers | Outputs |
|------|-----------|----------|----------|---------|
| FAZA 1 | P0-BLOCKER | 3 dana | Nema | PNPM workspace, .npmrc, monorepo struktura |
| FAZA 4 | P0-BLOCKER | 2 dana | FAZA 1 | Quality Gates enforcement, CI/CD |
| FAZA 7 | P0-BLOCKER | 2 dana | FAZA 4 | Verified metrics, validation app |

**Kritični put ukupno: 7 dana**

### High Priority (Nakon kritičnog puta)

| Faza | Prioritet | Trajanje | Parallelizable | Outputs |
|------|-----------|----------|----------------|---------|
| FAZA 2 | P1-HIGH | 2 dana | ✅ | TypeScript optimization, turbo |
| FAZA 3 | P0-BLOCKER | 3 dana | ✅ | Design tokens package |
| FAZA 5 | P1-HIGH | 2 dana | ✅ | Enhanced testing |
| FAZA 8 | P1-HIGH | 3 dana | ❌ (after FAZA 7) | Visual regression, NPM publish |

**High priority ukupno: 10 dana (parallel execution: 5 dana)**

### Medium Priority (Polish)

| Faza | Prioritet | Trajanje | Dependencies |
|------|-----------|----------|--------------|
| FAZA 6 | P2-MEDIUM | 2 dana | FAZA 8 |
| FAZA 9 | P2-MEDIUM | 2 dana | FAZA 8 |

**Medium priority ukupno: 4 dana**

### Low Priority (Future)

| Faza | Prioritet | Trajanje | Prerequisites |
|------|-----------|----------|---------------|
| FAZA 10 | P3-LOW | 6-8 sedmica | Community validation |

---

## 🆕 NOVA SEKCIJA: Finalni Timeline i Milestones

### Sprint 1 (Week 1): Critical Infrastructure

**Dani 1-3:** FAZA 1 - Package Management  
**Dani 4-5:** FAZA 4 - CI/CD Stabilization  
**Milestone:** CI/CD passing, dependency conflicts resolved

### Sprint 2 (Week 2): Core Platform

**Dani 6-7:** FAZA 7 - Verification  
**Dani 8-10 (parallel):** FAZA 2 (TypeScript) + FAZA 3 (Design Tokens)  
**Milestone:** All metrics verified, design tokens integrated

### Sprint 3 (Week 3): Testing & Quality

**Dani 11-12:** FAZA 5 - Testing Infrastructure  
**Dani 13-15:** FAZA 8 - Visual Regression & NPM  
**Milestone:** 80% coverage enforced, Chromatic integrated, first NPM release

### Sprint 4 (Week 4): Polish & Release

**Dani 16-17:** FAZA 6 - Production Prep  
**Dani 18-19:** FAZA 9 - Documentation  
**Dan 20:** Buffer/stabilization  
**Milestone:** **100% PRODUCTION-READY**

---

## 🆕 NOVA SEKCIJA: Success Criteria & Validation

### Definition of Done (Production-Ready)

**Technical Criteria:**

- [x] All 29 komponenti implementirane (100%)
- [ ] Design tokens paket kreiran i integrisan
- [ ] Test coverage >= 80% (verified)
- [ ] Bundle size < 150KB (verified)
- [ ] Zero TypeScript errors (verified)
- [ ] All Quality Gates passing (A=100%, B>=80%, C>=95%, D>=80%, E>=80%)
- [ ] CI/CD pipeline 100% stable
- [ ] Visual regression baseline established

**Distribution Criteria:**

- [ ] NPM package published (@dynui/core v1.0.0)
- [ ] Live Storybook demo deployed
- [ ] API documentation complete
- [ ] Migration guide published
- [ ] CHANGELOG.md established

**Community Criteria:**

- [ ] External code review completed
- [ ] Real-world validation app deployed
- [ ] GitHub release created
- [ ] Community feedback gathered
- [ ] At least 10 GitHub stars

---

## 🆕 NOVA SEKCIJA: Risk Mitigation

### High Risk Areas

**1. Test Coverage Verification (RISK: HIGH)**

- **Issue:** Claimed >80%, nije verifikovano
- **Mitigation:** FAZA 7 mandatory verification, CI enforcement
- **Contingency:** Dodavanje testova u FAZA 5, može extend na +3 dana

**2. Design Tokens Implementation (RISK: MEDIUM)**

- **Issue:** Kompletan nov paket, integration sa core
- **Mitigation:** FAZA 3 detaljno specificirana
- **Contingency:** Fallback na inline tokens ako deadline kritičan

**3. CI/CD Stability (RISK: MEDIUM)**

- **Issue:** Dependency conflicts, failing builds
- **Mitigation:** FAZA 1 rešava root cause, FAZA 4 stabilizacija
- **Contingency:** Manual quality checks kao backup

**4. Chromatic Integration (RISK: LOW)**

- **Issue:** Novi servis, setup complexity
- **Mitigation:** FAZA 8 step-by-step integracija
- **Contingency:** Playwright screenshots ako Chromatic fails

---

## 🆕 NOVA SEKCIJA: Rebranding & Marketing

### Immediate Changes Required

**README.md Update:**

```markdown
# DynUI-Fixed

**Status:** BETA - Advanced Development  
**Production Readiness:** 67/100 (In progress toward 100%)

## Current State
- ✅ 29 Components fully implemented
- ✅ TypeScript strict mode, zero errors
- ✅ WAI-ARIA compliant accessibility
- ⚠️ Design tokens package: In development
- ⚠️ Test coverage verification: In progress
- ⚠️ NPM publishing: Coming soon

## Roadmap to Production
- [x] Component implementation (100%)
- [ ] Design tokens system (FAZA 3)
- [ ] Quality gates enforcement (FAZA 4)
- [ ] Test coverage verification (FAZA 7)
- [ ] Visual regression (FAZA 8)
- [ ] NPM publish (FAZA 8)
- [ ] Documentation polish (FAZA 9)

**Expected production-ready:** 4 sedmice od danas
```

**GitHub Topics Update:**

```
Topics: 
- react
- typescript
- component-library
- design-system
- beta
- in-development
- accessibility
- wai-aria
```

---

## Zaključak

### Finalni Rezultat: 100% Production-Ready Monorepo

**Infrastructure Excellence:**

- ✅ Centralizovano dependency management sa PNPM catalog
- ✅ Robust CI/CD sa svih 5 Quality Gates (A-E) **fully operational**
- ✅ Comprehensive testing sa **verified >80% coverage**
- ✅ Bundle optimization i **automated performance monitoring**

**Component Library Maturity:**

- ✅ Sve 29 komponenti 100% FS-compliant
- ✅ Advanced accessibility i keyboard navigation
- ✅ **Design tokens sistem** za consistency
- ✅ Complete TypeScript API coverage

**Developer Experience:**

- ✅ Unified tooling across packages
- ✅ Automated quality checks sa **pre-commit hooks**
- ✅ **Visual regression testing** (Chromatic + Playwright)
- ✅ API contract validation

**Enterprise Readiness:**

- ✅ **NPM publishing pipeline** automated
- ✅ **Auto-generated documentation**
- ✅ Security scanning integrated
- ✅ Performance budgets enforced
- ✅ **Real-world validation** completed
- ✅ **Community review** incorporated

### 🎯 Ukupna Procena

**Trenutno stanje:** 67/100 (BETA)  
**Nakon FAZE 1-9:** 100/100 (PRODUCTION-READY)  

**Ukupno vreme:**

- Kritični put: 7 dana
- High priority: 5 dana (parallel)
- Medium priority: 4 dana
- **Total: 16-20 radnih dana (3.2-4 sedmice)**

**ROI:**

- Maksimalna stabilnost i maintainability
- Enterprise-grade quality assurance
- Community-validated production system
- Foundation za buduće microservices expansion (FAZA 10)

---

**Ovaj plan transformiše DYNUI-FIXED iz 67% complete foundation u 100% production-ready enterprise component library sa hibridnom monorepo arhitekturom koja omogućava buduće proširenje.**

**🚀 Ready for enterprise adoption i široku community integraciju.**

---

*Document Version: 2.0*  
*Last Updated: 24. oktobar 2025.*  
*Next Review: Nakon completion FAZE 1-4*
