import { createLibraryConfig } from '@dynui/build-config/tsup.library.config'

export default createLibraryConfig({
  entry: ['src/index.ts'],
  dts: {
    entry: {
      index: 'src/index.ts',
      components: 'src/components/index.ts',
      theme: 'src/theme/index.ts'
    },
    tsconfig: './tsconfig.json',
    compilerOptions: {
      composite: false
    }
  },
  external: ['react', 'react-dom']
})
