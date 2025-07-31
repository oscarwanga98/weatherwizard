import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme, ThemeProvider } from '../use-theme'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage mock
    vi.clearAllMocks()
    localStorage.clear()
    
    // Reset document classes
    document.documentElement.className = ''
  })

  it('initializes with light theme by default', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    expect(result.current.theme).toBe('light')
  })

  it('loads theme from localStorage if available', () => {
    localStorage.setItem('theme', 'dark')
    
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    expect(result.current.theme).toBe('dark')
  })

  it('cycles through themes correctly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    // Start with light
    expect(result.current.theme).toBe('light')
    
    // Click to dark
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('dark')
    
    // Click to cosmic
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('cosmic')
    
    // Click back to light
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('light')
  })

  it('saves themes to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('applies correct CSS classes to document element', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    // Dark theme
    act(() => {
      result.current.toggleTheme()
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Cosmic theme
    act(() => {
      result.current.toggleTheme()
    })
    expect(document.documentElement.classList.contains('cosmic')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})