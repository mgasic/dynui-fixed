import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null }
  disconnect() { return null }
  unobserve() { return null }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() { return null }
  disconnect() { return null }
  unobserve() { return null }
}

// Mock HTMLDialogElement for Modal tests
if (typeof HTMLDialogElement === 'undefined') {
  global.HTMLDialogElement = class HTMLDialogElement extends HTMLElement {
    open = false
    showModal() { this.open = true }
    close() { this.open = false }
  } as any
}
