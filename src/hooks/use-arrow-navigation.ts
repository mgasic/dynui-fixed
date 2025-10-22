// in use-arrow-navigation.ts and use-tooltip.ts
// replace NodeJS.Timeout with ReturnType<typeof setTimeout>
let timer: ReturnType<typeof setTimeout> | null = null
