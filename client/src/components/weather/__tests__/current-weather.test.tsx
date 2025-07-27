import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CurrentWeather } from '../current-weather'

// Mock the weather icons
vi.mock('@/lib/weather-icons', () => ({
  getWeatherIcon: vi.fn(() => 'fas fa-sun')
}))

const mockWeatherData = {
  location: {
    city: 'New York',
    country: 'US'
  },
  current: {
    temperature: 22,
    feelsLike: 25,
    condition: 'Clear',
    description: 'clear sky',
    icon: '01d',
    humidity: 65,
    pressure: 1013,
    windSpeed: 3.5,
    windDirection: 180,
    visibility: 10,
    uvIndex: 5
  }
}

describe('CurrentWeather', () => {
  it('renders weather data correctly', () => {
    render(<CurrentWeather weather={mockWeatherData} units="metric" />)
    
    expect(screen.getByText('New York, US')).toBeInTheDocument()
    expect(screen.getByText('22°C')).toBeInTheDocument()
    expect(screen.getByText('Feels like 25°C')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('1013')).toBeInTheDocument()
  })

  it('displays imperial units correctly', () => {
    render(<CurrentWeather weather={mockWeatherData} units="imperial" />)
    
    expect(screen.getByText('22°F')).toBeInTheDocument()
    expect(screen.getByText('Feels like 25°F')).toBeInTheDocument()
  })

  it('renders wind information', () => {
    render(<CurrentWeather weather={mockWeatherData} units="metric" />)
    
    expect(screen.getByText('3.5')).toBeInTheDocument()
  })

  it('renders visibility information', () => {
    render(<CurrentWeather weather={mockWeatherData} units="metric" />)
    
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('handles incomplete data gracefully', () => {
    const incompleteData = {
      location: { city: 'Test City', country: 'TC' },
      current: { 
        temperature: 20, 
        feelsLike: 22, 
        condition: 'Clear', 
        description: 'clear', 
        icon: '01d',
        humidity: 50,
        pressure: 1000,
        windSpeed: 2,
        windDirection: 90,
        visibility: 5,
        uvIndex: 3
      }
    }
    
    expect(() => {
      render(<CurrentWeather weather={incompleteData} units="metric" />)
    }).not.toThrow()
    
    expect(screen.getByText('Test City, TC')).toBeInTheDocument()
    expect(screen.getByText('20°C')).toBeInTheDocument()
  })
})