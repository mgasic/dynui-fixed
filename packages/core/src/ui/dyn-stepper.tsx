import React, { createContext, useContext, useCallback, useRef, useEffect } from 'react'
import { cn } from '../utils/classNames'
import type { Size } from '../types/common.types'

interface StepperContextValue {
  currentStep: number
  totalSteps: number
  orientation: 'horizontal' | 'vertical'
  onStepChange: (step: number) => void
  size: Size
}

const StepperContext = createContext<StepperContextValue | null>(null)

interface DynStepperProps {
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
  orientation?: 'horizontal' | 'vertical'
  size?: Size
  className?: string
  children: React.ReactNode
  'aria-label'?: string
  'data-testid'?: string
}

export function DynStepper({
  currentStep,
  totalSteps,
  onStepChange,
  orientation = 'horizontal',
  size = 'md',
  className,
  children,
  'aria-label': ariaLabel = 'Step navigation',
  'data-testid': dataTestId,
}: DynStepperProps) {
  const stepperRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        if (currentStep < totalSteps) {
          onStepChange(currentStep + 1)
        }
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        if (currentStep > 1) {
          onStepChange(currentStep - 1)
        }
        break
      case 'Home':
        event.preventDefault()
        onStepChange(1)
        break
      case 'End':
        event.preventDefault()
        onStepChange(totalSteps)
        break
    }
  }, [currentStep, totalSteps, onStepChange])

  const contextValue: StepperContextValue = {
    currentStep,
    totalSteps,
    orientation,
    onStepChange,
    size
  }

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        ref={stepperRef}
        className={cn(
          'dyn-stepper',
          `dyn-stepper--${orientation}`,
          `dyn-stepper--${size}`,
          className
        )}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        data-testid={dataTestId}
      >
        {children}
      </div>
    </StepperContext.Provider>
  )
}

interface DynStepProps {
  step: number
  title: string
  description?: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  'data-testid'?: string
}

export function DynStep({
  step,
  title,
  description,
  disabled = false,
  className,
  children,
  onClick,
  'data-testid': dataTestId,
}: DynStepProps) {
  const context = useContext(StepperContext)
  const stepRef = useRef<HTMLButtonElement>(null)

  if (!context) {
    throw new Error('DynStep must be used within a DynStepper')
  }

  const { currentStep, totalSteps, orientation, onStepChange, size } = context
  
  const isActive = currentStep === step
  const isCompleted = currentStep > step
  const isPending = currentStep < step

  // Auto-focus active step
  useEffect(() => {
    if (isActive && stepRef.current) {
      stepRef.current.focus()
    }
  }, [isActive])

  const handleClick = useCallback(() => {
    if (!disabled) {
      onStepChange(step)
      onClick?.()
    }
  }, [disabled, onStepChange, step, onClick])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }, [handleClick])

  const getStepStatus = () => {
    if (isCompleted) return 'completed'
    if (isActive) return 'current'
    return 'pending'
  }

  return (
    <div
      className={cn(
        'dyn-step',
        `dyn-step--${getStepStatus()}`,
        `dyn-step--${orientation}`,
        `dyn-step--${size}`,
        disabled && 'dyn-step--disabled',
        className
      )}
      data-testid={dataTestId}
    >
      <button
        ref={stepRef}
        className="dyn-step__button"
        role="tab"
        aria-current={isActive ? 'step' : undefined}
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      >
        <div className="dyn-step__indicator">
          <span className="dyn-step__number" aria-hidden="true">
            {isCompleted ? (
              <svg
                className="dyn-step__check-icon"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              step
            )}
          </span>
        </div>
        
        <div className="dyn-step__content">
          <div className="dyn-step__title">{title}</div>
          {description && (
            <div className="dyn-step__description">{description}</div>
          )}
        </div>
      </button>

      {children && (
        <div 
          className="dyn-step__panel"
          role="tabpanel"
          aria-labelledby={`step-${step}`}
          hidden={!isActive}
        >
          {children}
        </div>
      )}

      {/* Connector line */}
      {step < totalSteps && (
        <div 
          className={cn(
            'dyn-step__connector',
            isCompleted && 'dyn-step__connector--completed'
          )}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Hook for using stepper context
export function useStepperContext() {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepperContext must be used within a DynStepper')
  }
  return context
}