import { forwardRef } from 'react';
import type { DynStepperProps, StepItem } from '../types/components/dyn-stepper.types';
import { classNames } from '../utils';

export const DynStepper = forwardRef<HTMLDivElement, DynStepperProps>(
  ({
    items = [],
    currentStep = 0,
    orientation = 'horizontal',
    className,
    'data-testid': testId,
    ...props
  }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames('dyn-stepper', `dyn-stepper--${orientation}`, className)}
      data-testid={testId}
    >
      {items.map((item, index) => (
        <DynStep key={item.id || index} item={item} stepIndex={index} currentStep={currentStep} />
      ))}
    </div>
  )
);

DynStepper.displayName = 'DynStepper';

export function DynStep({ item, stepIndex, currentStep }: { item: StepItem; stepIndex: number; currentStep: number }) {
  const status = stepIndex < currentStep ? 'completed' : stepIndex === currentStep ? 'current' : 'upcoming';
  
  return (
    <div className={classNames('dyn-step', `dyn-step--${status}`)}>
      <div className="dyn-step__indicator">
        {status === 'completed' ? '✓' : stepIndex + 1}
      </div>
      <div className="dyn-step__content">
        <div className="dyn-step__title">{item.title}</div>
        {item.description && (
          <div className="dyn-step__description">{item.description}</div>
        )}
      </div>
    </div>
  );
}