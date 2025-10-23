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
  children?: React.ReactNode | ((args: RenderPropArgs) => React.ReactNode);
  className?: string;
  'data-testid'?: string;
}