import { describe, it, expect } from 'vitest'
import { getWeatherIcon } from '@/lib/weather-icons'

describe('Weather Utilities', () => {
  describe('getWeatherIcon', () => {
    it('returns correct icon for clear day', () => {
      expect(getWeatherIcon('01d')).toBe('fas fa-sun')
    })

    it('returns correct icon for clear night', () => {
      expect(getWeatherIcon('01n')).toBe('fas fa-moon')
    })

    it('returns correct icon for partly cloudy day', () => {
      expect(getWeatherIcon('02d')).toBe('fas fa-cloud-sun')
    })

    it('returns correct icon for partly cloudy night', () => {
      expect(getWeatherIcon('02n')).toBe('fas fa-cloud-moon')
    })

    it('returns correct icon for scattered clouds', () => {
      expect(getWeatherIcon('03d')).toBe('fas fa-cloud')
      expect(getWeatherIcon('03n')).toBe('fas fa-cloud')
    })

    it('returns correct icon for broken clouds', () => {
      expect(getWeatherIcon('04d')).toBe('fas fa-clouds')
      expect(getWeatherIcon('04n')).toBe('fas fa-clouds')
    })

    it('returns correct icon for shower rain', () => {
      expect(getWeatherIcon('09d')).toBe('fas fa-cloud-rain')
      expect(getWeatherIcon('09n')).toBe('fas fa-cloud-rain')
    })

    it('returns correct icon for rain', () => {
      expect(getWeatherIcon('10d')).toBe('fas fa-cloud-sun-rain')
      expect(getWeatherIcon('10n')).toBe('fas fa-cloud-moon-rain')
    })

    it('returns correct icon for thunderstorm', () => {
      expect(getWeatherIcon('11d')).toBe('fas fa-bolt')
      expect(getWeatherIcon('11n')).toBe('fas fa-bolt')
    })

    it('returns correct icon for snow', () => {
      expect(getWeatherIcon('13d')).toBe('fas fa-snowflake')
      expect(getWeatherIcon('13n')).toBe('fas fa-snowflake')
    })

    it('returns correct icon for mist', () => {
      expect(getWeatherIcon('50d')).toBe('fas fa-smog')
      expect(getWeatherIcon('50n')).toBe('fas fa-smog')
    })

    it('returns default icon for unknown codes', () => {
      expect(getWeatherIcon('99x')).toBe('fas fa-question')
    })
  })
})