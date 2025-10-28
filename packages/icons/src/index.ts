/**
 * Minimal icon registry placeholder for Phase 1 validation.  The goal is to
 * ensure consuming packages have a typed surface while the final asset pipeline
 * is being designed.
 */
export type DynIconName = 'check' | 'close' | 'info'

export interface DynIconDefinition {
  name: DynIconName
  svgPath: string
  viewBox?: string
}

export const icons: Record<DynIconName, DynIconDefinition> = {
  check: {
    name: 'check',
    svgPath: 'M5 13l4 4L19 7',
    viewBox: '0 0 24 24'
  },
  close: {
    name: 'close',
    svgPath: 'M6 6l12 12M6 18L18 6',
    viewBox: '0 0 24 24'
  },
  info: {
    name: 'info',
    svgPath: 'M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1.5 5.5h-3v7h3v-7z',
    viewBox: '0 0 24 24'
  }
}

export function getIcon(name: DynIconName): DynIconDefinition {
  return icons[name]
}
