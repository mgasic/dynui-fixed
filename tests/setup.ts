import { axe, toHaveNoViolations } from 'vitest-axe'
import '@testing-library/jest-dom'

expect.extend(toHaveNoViolations)

// any additional global setup for tests
