import { tokens } from '../src/index'

type TokenValue = string | number | TokenGroup
interface TokenGroup {
  [key: string]: TokenValue
}

function sanitizeTokenKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function sanitizeTokenKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_-]/g, '-')
}

function toCSSVars(record: TokenRecord, prefix: string[] = []): string[] {
  return Object.entries(record).flatMap(([key, value]) => {
    const sanitizedKey = sanitizeTokenKey(key)
    const nextPrefix = [...prefix, sanitizedKey]
    if (typeof value === 'object' && value !== null) {
      return toCSSVars(value as TokenGroup, nextPrefix)
    }

    const cssVar = `--du-${nextPrefix.join('-')}`
    return `${cssVar}: ${String(value)};`
  })
}

/**
 * Builds a CSS string containing custom properties for every token.
 * Consumers can later pipe this into a file writer in their own build.
 */
export function buildDesignTokenCSS(): string {
  const lines = toCSSVars(tokens as TokenGroup)
  return [':root {', ...lines.map((line) => `  ${line}`), '}'].join('\n')
}
