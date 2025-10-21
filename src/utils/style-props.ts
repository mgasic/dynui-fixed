import type { SpacingValue } from '../types/components/dyn-box.types'

export interface StyleProps {
  p?: SpacingValue
  m?: SpacingValue
  gap?: SpacingValue
}

export function getSpacingStyles(props: StyleProps) {
  const styles: Record<string, string> = {}
  
  if (props.p) styles['--spacing-p'] = `var(--spacing-${props.p})`
  if (props.m) styles['--spacing-m'] = `var(--spacing-${props.m})`
  if (props.gap) styles['--spacing-gap'] = `var(--spacing-${props.gap})`
  
  return styles
}
