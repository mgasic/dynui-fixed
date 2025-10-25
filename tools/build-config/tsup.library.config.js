import { defineConfig } from 'tsup'

/**
 * @typedef {import('tsup').Options} Options
 */

/** @type {Options} */
const baseOptions = {
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false
}

/**
 * @param {Options} [overrides]
 */
export function createLibraryConfig(overrides = {}) {
  return defineConfig({
    ...baseOptions,
    ...overrides,
    entry: overrides.entry ?? ['src/index.ts'],
    external: overrides.external ?? []
  })
}

export default createLibraryConfig()
