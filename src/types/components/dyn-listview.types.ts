export interface ListViewItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface DynListViewProps {
  items?: ListViewItem[];
  selectedItem?: string;
  onSelectionChange?: (selectedIds: string[]) => void;
  multiSelect?: boolean;
  className?: string;
  'data-testid'?: string;
}