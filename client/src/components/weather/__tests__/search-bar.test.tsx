import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchBar } from '../search-bar'

// Mock the query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('SearchBar', () => {
  const mockOnLocationSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search input', () => {
    renderWithQueryClient(
      <SearchBar onLocationSelect={mockOnLocationSelect} />
    )
    
    expect(screen.getByPlaceholderText('Search for a city...')).toBeInTheDocument()
  })

  it('allows typing in search input', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(
      <SearchBar onLocationSelect={mockOnLocationSelect} />
    )
    
    const input = screen.getByPlaceholderText('Search for a city...')
    await user.type(input, 'New York')
    
    expect(input).toHaveValue('New York')
  })

  it('shows search results when typing', async () => {
    const user = userEvent.setup()
    
    // Mock fetch for search results
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 }
      ])
    })

    renderWithQueryClient(
      <SearchBar onLocationSelect={mockOnLocationSelect} />
    )
    
    const input = screen.getByPlaceholderText('Search for a city...')
    await user.type(input, 'New York')
    
    await waitFor(() => {
      expect(screen.getByText('New York, US')).toBeInTheDocument()
    })
  })

  it('calls onLocationSelect when result is clicked', async () => {
    const user = userEvent.setup()
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 }
      ])
    })

    renderWithQueryClient(
      <SearchBar onLocationSelect={mockOnLocationSelect} />
    )
    
    const input = screen.getByPlaceholderText('Search for a city...')
    await user.type(input, 'New York')
    
    await waitFor(() => {
      expect(screen.getByText('New York, US')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('New York, US'))
    
    expect(mockOnLocationSelect).toHaveBeenCalledWith(40.7128, -74.0060)
  })
})