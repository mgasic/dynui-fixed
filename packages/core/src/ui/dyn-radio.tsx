import {
  Children,
  ChangeEvent,
  cloneElement,
  forwardRef,
  isValidElement,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef
} from 'react'
import type { InputHTMLAttributes } from 'react'
import type { DynRadioGroupProps, DynRadioProps } from '../types/components/dyn-radio.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { classNames } from '../utils'

export const DynRadio = forwardRef<HTMLInputElement, DynRadioProps>(
  ({
    value,
    name,
    checked,
    defaultChecked,
    disabled = false,
    children,
    className,
    onChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': testId,
    size,
    ...props
  }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      if (typeof onChange === 'function') {
        onChange(event.target.value, event)
      }
    }

    // Remaining props are forwarded to the underlying input element
    const inputProps = props as InputHTMLAttributes<HTMLInputElement>

    return (
      <label
        className={classNames(
          'dyn-radio',
          size ? `dyn-radio--${size}` : undefined,
          disabled ? 'dyn-radio--disabled' : undefined,
          typeof className === 'string' ? className : undefined
        )}
      >
        <input
          {...inputProps}
          ref={ref}
          type="radio"
          value={value}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          data-testid={testId}
          className="dyn-radio__input"
        />
        <span className="dyn-radio__indicator" />
        {children && (
          <span className="dyn-radio__label">
            {children}
          </span>
        )}
      </label>
    )
  }
)

DynRadio.displayName = 'DynRadio'

export const DynRadioGroup = forwardRef<HTMLDivElement, DynRadioGroupProps>(
  ({
    value,
    defaultValue,
    name,
    disabled = false,
    orientation = 'vertical',
    children,
    className,
    onChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': testId,
    ...props
  }, ref) => {
    const orientationValue = orientation ?? 'vertical'
    const { containerRef } = useArrowNavigation({
      orientation: orientationValue,
      selector: 'input[type="radio"]:not(:disabled)'
    })

    const fallbackNameRef = useRef(
      name ?? `radio-group-${Math.random().toString(36).slice(2, 11)}`
    )
    useEffect(() => {
      if (name) {
        fallbackNameRef.current = name
      }
    }, [name])
    const groupName = name ?? fallbackNameRef.current

    const setGroupRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node

        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [containerRef, ref]
    )

    const handleChange = (selectedValue: string, event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      if (typeof onChange === 'function') {
        onChange(selectedValue, event)
      }
    }

    return (
      <div
        {...props}
        ref={setGroupRef}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-testid={testId}
        className={classNames(
          'dyn-radio-group',
          orientationValue ? `dyn-radio-group--${orientationValue}` : undefined,
          disabled ? 'dyn-radio-group--disabled' : undefined,
          typeof className === 'string' ? className : undefined
        )}
      >
        {Children.map(children, (child) => {
          if (isValidElement<DynRadioProps>(child) && child.type === DynRadio) {
            const childProps: Partial<DynRadioProps> = {
              ...child.props,
              name: groupName,
              checked: value !== undefined ? child.props.value === value : undefined,
              defaultChecked:
                defaultValue !== undefined ? child.props.value === defaultValue : undefined,
              disabled: disabled || child.props.disabled || undefined,
              onChange: handleChange
            }
            return cloneElement(child, childProps)
          }
          return child
        })}
      </div>
    )
  }
)

DynRadioGroup.displayName = 'DynRadioGroup'
