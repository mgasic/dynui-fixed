export interface DynListViewItem {
  key?: string;
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DynListViewProps {
  items?: DynListViewItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  onSelectionChange?: (selectedValues: string[]) => void;
  multiSelect?: boolean;
  className?: string;
  'data-testid'?: string;
}
