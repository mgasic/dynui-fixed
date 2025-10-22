export * from './class-names'
export * from './generate-initials'
export * from './style-props'

// Back-compat helpers used by components
export function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function getSpacingStyles(
  { p, m, gap }: { p?: number | string; m?: number | string; gap?: number | string }
): React.CSSProperties {
  const styles: React.CSSProperties = {}
  if (p !== undefined) styles.padding = typeof p === 'number' ? `${p}px` : p
  if (m !== undefined) styles.margin = typeof m === 'number' ? `${m}px` : m
  if (gap !== undefined) (styles as any).gap = typeof gap === 'number' ? `${gap}px` : gap
  return styles
}
