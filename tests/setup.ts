import { toHaveNoViolations } from 'vitest-axe/matchers'
import '@testing-library/jest-dom'

expect.extend(toHaveNoViolations)

// any additional global setup for tests
