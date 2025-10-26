import { useState, useCallback } from 'react'

/**
 * Options for useControlled hook
 */
export interface UseControlledOptions<T> {
  /** Controlled value */
  value?: T | undefined
  /** Default value for uncontrolled mode */
  defaultValue?: T | undefined
  /** Change handler */
  onChange?: ((value: T) => void) | undefined
}

/**
 * Return type for useControlled hook
 */
export interface UseControlledReturn<T> {
  /** Current value (controlled or internal state) */
  value: T
  /** Function to update the value */
  setValue: (value: T) => void
  /** Whether component is in controlled mode */
  isControlled: boolean
}

/**
 * Standard controlled/uncontrolled form control hook
 * 
 * This hook implements the canonical pattern for all form components:
 * - If `value` prop is provided, component is controlled
 * - If only `defaultValue` is provided, component is uncontrolled
 * - onChange is called in both modes when value changes
 * 
 * Usage in components:
 * ```ts
 * function DynInput({ value, defaultValue, onChange, ...props }) {
 *   const { value: current, setValue } = useControlled({ value, defaultValue, onChange })
 *   
 *   return (
 *     <input 
 *       value={current} 
 *       onChange={(e) => setValue(e.target.value)}
 *       {...props}
 *     />
 *   )
 * }
 * ```
 * 
 * @param options - Control options with value, defaultValue, and onChange
 * @returns Object with current value and setValue function
 */
export function useControlled<T>(
  options: UseControlledOptions<T>
): UseControlledReturn<T> {
  const { value, defaultValue, onChange } = options
  
  const [internalValue, setInternalValue] = useState<T>(defaultValue as T)
  const isControlled = value !== undefined
  
  const currentValue = isControlled ? value : internalValue
  
  const setValue = useCallback(
    (newValue: T) => {
      // Update internal state only if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue)
      }
      
      // Always call onChange if provided
      onChange?.(newValue)
    },
    [isControlled, onChange]
  )
  
  return {
    value: currentValue,
    setValue,
    isControlled
  }
}