import type { ReactNode } from 'react';

interface RenderPropArgs {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

export interface DynFieldContainerProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children?: ReactNode | ((args: RenderPropArgs) => ReactNode);
  className?: string;
  'data-testid'?: string;
}