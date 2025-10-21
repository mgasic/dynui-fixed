import { createContext, useContext, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import type { DynStepperProps, DynStepperRef, StepItem } from '../types/components/dyn-stepper.types'

interface StepperCtx { value: string; setValue: (v: string) => void }
const StepperContext = createContext<StepperCtx | null>(null)

export const DynStepper = forwardRef<DynStepperRef, React.PropsWithChildren<DynStepperProps>>(function DynStepper(
  { as: As = 'div', value, defaultValue, onChange, children, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'data-testid': dataTestId },
  ref
) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const current = value ?? internal
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v)
    onChange?.(v)
  }
  const ctx = useMemo(() => ({ value: current, setValue }), [current])
  const itemsRef = useRef<HTMLButtonElement[]>([])
  useImperativeHandle(ref, () => ({ focus: (idx: number) => itemsRef.current[idx]?.focus() }))
  return (
    <As role="tablist" aria-label={ariaLabel} aria-labelledby={ariaLabelledby} data-testid={dataTestId}>
      <StepperContext.Provider value={ctx}>{children}</StepperContext.Provider>
    </As>
  )
})

export function DynStep({ item, index }: { item: StepItem; index: number }) {
  const ctx = useContext(StepperContext)
  if (!ctx) throw new Error('DynStep must be used within DynStepper')
  const isActive = ctx.value === item.value
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button ref={ref} role="tab" aria-selected={isActive} onClick={() => ctx.setValue(item.value)}>
      {item.label}
    </button>
  )
}
