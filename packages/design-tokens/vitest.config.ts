import baseConfig from '../../vitest.config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['packages/design-tokens/tests/**/*.test.ts'],
    setupFiles: []
  }
})
