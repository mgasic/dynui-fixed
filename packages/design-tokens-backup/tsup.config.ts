import { createLibraryConfig } from '@dynui/build-config/tsup.library.config'

export default createLibraryConfig({
  entry: ['src/index.ts'],
  dts: false
})
