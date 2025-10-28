import { defineConfig } from 'tsup';

/**
 * Shared tsup defaults that individual packages can extend.
 */
export const tsupDefaults = defineConfig({
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs']
});

/**
 * Shared compiler options useful for package-level `tsconfig.json` files.
 */
export const tsconfigCompilerOptions = {
  moduleResolution: 'bundler' as const,
  module: 'ESNext' as const,
  jsx: 'react-jsx' as const
};

/**
 * Convenience helper to merge overrides with the shared tsup defaults.
 */
export function createTsupConfig(overrides: Parameters<typeof defineConfig>[0]) {
  return defineConfig({ ...tsupDefaults, ...overrides });
}
