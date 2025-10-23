export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface DynStepperProps {
  items?: StepItem[];
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  'data-testid'?: string;
}