import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Unified Vite/Vitest config for Storybook builder resolution
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    outDir: 'dist'
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: { reporter: ['text', 'lcov'] }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  resolve: {
    alias: {
      '@dynui': '/src'
    }
  }
})