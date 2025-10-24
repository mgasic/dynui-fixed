import { tokens } from '../src/index'

type TokenRecord = Record<string, string | number | TokenRecord>

function sanitizeTokenKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_-]/g, '-')
}

function toCSSVars(record: TokenRecord, prefix: string[] = []): string[] {
  return Object.entries(record).flatMap(([key, value]) => {
    const sanitizedKey = sanitizeTokenKey(key)
    const nextPrefix = [...prefix, sanitizedKey]
    if (typeof value === 'object' && value !== null) {
      return toCSSVars(value as TokenRecord, nextPrefix)
    }

    const cssVar = `--du-${nextPrefix.join('-')}`
    return `${cssVar}: ${value};`
  })
}

/**
 * Builds a CSS string containing custom properties for every token.
 * Consumers can later pipe this into a file writer in their own build.
 */
export function buildDesignTokenCSS(): string {
  const lines = toCSSVars(tokens as TokenRecord)
  return [':root {', ...lines.map((line) => `  ${line}`), '}'].join('\n')
}
