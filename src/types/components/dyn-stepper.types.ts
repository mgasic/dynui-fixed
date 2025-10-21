export interface StepItem { key: string; value: string; label: string; disabled?: boolean }
export interface DynStepperRef { focus: (idx: number) => void }
export interface DynStepperProps {
  as?: React.ElementType
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
