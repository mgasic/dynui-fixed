import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function run() {
  const outDir = resolve(__dirname, '../dist')
  const outFile = resolve(outDir, 'tokens.css')

  await mkdir(outDir, { recursive: true })

  const { buildDesignTokenCSS } = await import('../dist/index.js')
  const css = `${buildDesignTokenCSS()}\n`

  await writeFile(outFile, css, { encoding: 'utf-8' })
  console.info(`[design-tokens] CSS variables written to ${outFile}`)
}

void run()
