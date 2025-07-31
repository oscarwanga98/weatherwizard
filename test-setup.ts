import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_OPENWEATHER_API_KEY: 'test-api-key'
  }
}))

// Mock geolocation API
Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: vi.fn((success) =>
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
      })
    ),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  },
  writable: true,
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})