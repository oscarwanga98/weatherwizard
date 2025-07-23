import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || process.env.OPENWEATHERMAP_API_KEY || "demo_key";
  
  // Get weather data by coordinates
  app.get("/api/weather/:lat/:lon", async (req, res) => {
    try {
      const { lat, lon } = req.params;
      const units = req.query.units || 'metric';
      
      // Current weather and forecast
      const [currentResponse, forecastResponse, airQualityResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=${units}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=${units}`),
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      const airQualityData = airQualityResponse.ok ? await airQualityResponse.json() : null;

      // Transform current weather data
      const current = {
        location: {
          city: currentData.name,
          country: currentData.sys.country,
          lat: currentData.coord.lat,
          lon: currentData.coord.lon,
        },
        current: {
          temperature: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          condition: currentData.weather[0].main,
          icon: currentData.weather[0].icon,
          humidity: currentData.main.humidity,
          windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
          pressure: currentData.main.pressure,
          visibility: Math.round(currentData.visibility / 1000), // Convert to km
          uvIndex: 0, // UV index not available in basic API
          sunrise: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          sunset: new Date(currentData.sys.sunset * 1000).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
        },
        timestamp: new Date().toISOString(),
      };

      // Transform hourly forecast (next 12 hours)
      const hourly = forecastData.list.slice(0, 12).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric',
          hour12: true 
        }),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        precipitation: Math.round((item.pop || 0) * 100),
        windSpeed: Math.round(item.wind.speed * 3.6),
      }));

      // Transform daily forecast (next 5 days)
      const dailyMap = new Map();
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyMap.has(date)) {
          dailyMap.set(date, {
            date: new Date(item.dt * 1000).toISOString().split('T')[0],
            dayName: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            high: item.main.temp_max,
            low: item.main.temp_min,
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            precipitation: Math.round((item.pop || 0) * 100),
            sunrise: current.current.sunrise,
            sunset: current.current.sunset,
            temps: [item.main.temp]
          });
        } else {
          const day = dailyMap.get(date);
          day.high = Math.max(day.high, item.main.temp_max);
          day.low = Math.min(day.low, item.main.temp_min);
          day.temps.push(item.main.temp);
        }
      });

      const daily = Array.from(dailyMap.values()).slice(0, 5).map((day: any) => ({
        ...day,
        high: Math.round(day.high),
        low: Math.round(day.low),
      }));

      // Transform air quality data
      let airQuality = null;
      if (airQualityData && airQualityData.list && airQualityData.list.length > 0) {
        const aqData = airQualityData.list[0];
        const aqi = aqData.main.aqi;
        const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
        
        airQuality = {
          aqi: aqi,
          level: levels[aqi - 1] || 'Unknown',
          pm25: aqData.components.pm2_5 || 0,
          pm10: aqData.components.pm10 || 0,
          o3: aqData.components.o3 || 0,
          no2: aqData.components.no2 || 0,
          so2: aqData.components.so2 || 0,
          co: aqData.components.co || 0,
        };
      }

      res.json({
        current,
        hourly,
        daily,
        airQuality,
        alerts: [], // Weather alerts would require additional API calls
      });
    } catch (error) {
      console.error('Weather API error:', error);
      res.status(500).json({ 
        message: 'Failed to fetch weather data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Search cities
  app.get("/api/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to search cities');
      }

      const data = await response.json();
      const results = data.map((item: any) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
      }));

      res.json(results);
    } catch (error) {
      console.error('City search error:', error);
      res.status(500).json({ 
        message: 'Failed to search cities',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
