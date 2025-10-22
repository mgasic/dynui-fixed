// utility types
export type SpacingValue = number | string

export type StyleProps = {
  p?: SpacingValue | undefined
  m?: SpacingValue | undefined
  gap?: SpacingValue | undefined
  // add other optional props as needed
}

export function getStyleProps(props: StyleProps) {
  const style: Record<string, any> = {}
  if (props.p !== undefined) style.padding = props.p
  if (props.m !== undefined) style.margin = props.m
  if (props.gap !== undefined) style.gap = props.gap
  return style
}
