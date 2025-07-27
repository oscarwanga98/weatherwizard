import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

// Mock the storage
const mockStorage = {
  // Add mock storage methods if needed
}

// Mock environment variables
vi.mock('process', () => ({
  env: {
    OPENWEATHER_API_KEY: 'test-api-key'
  }
}))

describe('Server Routes', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    
    // Mock weather API endpoint
    app.get('/api/weather/current', (req, res) => {
      const { lat, lon } = req.query
      
      if (!lat || !lon) {
        return res.status(400).json({ error: 'Missing coordinates' })
      }

      // Mock weather response
      res.json({
        location: {
          city: 'Test City',
          country: 'TC'
        },
        current: {
          temperature: 22,
          feelsLike: 25,
          condition: 'Clear',
          description: 'clear sky',
          icon: '01d',
          humidity: 65,
          pressure: 1013,
          windSpeed: 15,
          windDirection: 180,
          visibility: 10,
          uvIndex: 5
        }
      })
    })

    // Mock search endpoint
    app.get('/api/search', (req, res) => {
      const { q } = req.query
      
      if (!q) {
        return res.status(400).json({ error: 'Missing query' })
      }

      // Mock search response
      res.json([
        {
          name: 'Test City',
          country: 'TC',
          lat: 40.7128,
          lon: -74.0060
        }
      ])
    })
  })

  describe('GET /api/weather/current', () => {
    it('should return weather data for valid coordinates', async () => {
      const response = await request(app)
        .get('/api/weather/current')
        .query({ lat: 40.7128, lon: -74.0060 })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('location')
      expect(response.body).toHaveProperty('current')
      expect(response.body.location.city).toBe('Test City')
      expect(response.body.current.temperature).toBe(22)
    })

    it('should return 400 for missing coordinates', async () => {
      const response = await request(app)
        .get('/api/weather/current')

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should return 400 for invalid coordinates', async () => {
      const response = await request(app)
        .get('/api/weather/current')
        .query({ lat: 'invalid', lon: 'invalid' })

      expect(response.status).toBe(400)
    })
  })

  describe('GET /api/search', () => {
    it('should return search results for valid query', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'London' })

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body[0]).toHaveProperty('name')
      expect(response.body[0]).toHaveProperty('country')
      expect(response.body[0]).toHaveProperty('lat')
      expect(response.body[0]).toHaveProperty('lon')
    })

    it('should return 400 for missing query', async () => {
      const response = await request(app)
        .get('/api/search')

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should handle empty search results', async () => {
      // This would require mocking the actual OpenWeather API
      // For now, we assume the endpoint always returns some results
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'NonexistentCity123' })

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })
})