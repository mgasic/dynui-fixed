import { defineConfig, Options } from 'tsup'

const baseOptions: Options = {
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false
}

export function createLibraryConfig(overrides: Options = {}) {
  return defineConfig({
    ...baseOptions,
    ...overrides,
    entry: overrides.entry ?? ['src/index.ts'],
    external: overrides.external ?? []
  })
}

export default createLibraryConfig()
