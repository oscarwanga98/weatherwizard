import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useGeolocation } from '../use-geolocation'

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with default state', () => {
    const { result } = renderHook(() => useGeolocation())
    
    expect(result.current.isLoading).toBe(false)
  })

  it('gets coordinates successfully', async () => {
    const mockCoords = {
      latitude: 40.7128,
      longitude: -74.0060,
    }

    // Mock successful geolocation
    const getCurrentPositionMock = vi.fn((success) => {
      success({
        coords: mockCoords,
      })
    })
    
    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(getCurrentPositionMock)

    const { result } = renderHook(() => useGeolocation())
    
    const locationPromise = result.current.getCurrentLocation()

    await expect(locationPromise).resolves.toEqual({
      lat: 40.7128,
      lon: -74.0060,
    })
  })

  it('handles geolocation errors', async () => {
    const mockError = { code: 1 } // PERMISSION_DENIED
    
    const getCurrentPositionMock = vi.fn((success, error) => {
      error(mockError)
    })
    
    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(getCurrentPositionMock)

    const { result } = renderHook(() => useGeolocation())
    
    const locationPromise = result.current.getCurrentLocation()

    await expect(locationPromise).rejects.toThrow('Location access denied. Please enable location services.')
  })

  it('sets loading state during geolocation request', () => {
    const getCurrentPositionMock = vi.fn()
    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(getCurrentPositionMock)

    const { result } = renderHook(() => useGeolocation())
    
    result.current.getCurrentLocation()

    expect(result.current.isLoading).toBe(true)
  })

  it('handles geolocation not supported', async () => {
    // Mock geolocation not available
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true,
    })

    const { result } = renderHook(() => useGeolocation())
    
    const locationPromise = result.current.getCurrentLocation()

    await expect(locationPromise).rejects.toThrow('Geolocation is not supported by this browser')
  })
})