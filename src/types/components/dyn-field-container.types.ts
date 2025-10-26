import type { ReactNode } from 'react';

export interface DynFieldContainerProps {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children?: ReactNode | ((args: DynFieldContainerRenderArgs) => ReactNode);
  className?: string;
  'data-testid'?: string;
}

export interface DynFieldContainerRenderArgs {
  id: string;
  inputId: string;
  descriptionId?: string;
  errorId?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  'aria-invalid'?: boolean;
}