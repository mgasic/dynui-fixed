import { useMemo, useState } from 'react'
import type { DynListViewProps, ListViewItem } from '../types/components/dyn-listview.types'

export function DynListView({ items = [], value, defaultValue, multiSelect = false, disabled, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'data-testid': dataTestId }: DynListViewProps) {
  const [internal, setInternal] = useState<string | string[] | undefined>(defaultValue)
  const current = value ?? internal ?? (multiSelect ? [] : '')

  const setValue = (next: string | string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }

  const isSelected = (v: string) => (Array.isArray(current) ? current.includes(v) : current === v)
  const toggle = (v: string) => {
    if (disabled) return
    if (multiSelect) {
      const next = Array.isArray(current) ? (isSelected(v) ? current.filter(x => x !== v) : [...current, v]) : [v]
      setValue(next)
    } else {
      setValue(v)
    }
  }

  return (
    <div role="listbox" aria-multiselectable={multiSelect || undefined} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} data-testid={dataTestId}>
      {items.map((it: ListViewItem) => (
        <div key={it.key} role="option" aria-selected={isSelected(it.value)} aria-disabled={it.disabled} onClick={() => !it.disabled && toggle(it.value)}>
          {it.label}
        </div>
      ))}
    </div>
  )
}
