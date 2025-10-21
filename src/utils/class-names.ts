type ClassValue = string | number | boolean | undefined | null
type ClassArray = ClassValue[]
type ClassDict = Record<string, any>
type ClassNameValue = ClassValue | ClassArray | ClassDict

export function classNames(...classes: ClassNameValue[]): string {
  const result: string[] = []
  
  for (const cls of classes) {
    if (!cls) continue
    
    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(String(cls))
    } else if (Array.isArray(cls)) {
      const nested = classNames(...cls)
      if (nested) result.push(nested)
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) result.push(key)
      }
    }
  }
  
  return result.join(' ')
}
