import { z } from "zod";

// Weather API response schemas
export const CurrentWeatherSchema = z.object({
  location: z.object({
    city: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
  }),
  current: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    condition: z.string(),
    icon: z.string(),
    humidity: z.number(),
    windSpeed: z.number(),
    pressure: z.number(),
    visibility: z.number(),
    uvIndex: z.number(),
    sunrise: z.string(),
    sunset: z.string(),
  }),
  timestamp: z.string(),
});

export const HourlyForecastSchema = z.object({
  time: z.string(),
  temperature: z.number(),
  condition: z.string(),
  icon: z.string(),
  precipitation: z.number(),
  windSpeed: z.number(),
});

export const DailyForecastSchema = z.object({
  date: z.string(),
  dayName: z.string(),
  high: z.number(),
  low: z.number(),
  condition: z.string(),
  icon: z.string(),
  precipitation: z.number(),
  sunrise: z.string(),
  sunset: z.string(),
});

export const AirQualitySchema = z.object({
  aqi: z.number(),
  level: z.string(),
  pm25: z.number(),
  pm10: z.number(),
  o3: z.number(),
  no2: z.number(),
  so2: z.number(),
  co: z.number(),
});

export const WeatherAlertSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.string(),
  issued: z.string(),
  expires: z.string(),
});

export const WeatherDataSchema = z.object({
  current: CurrentWeatherSchema,
  hourly: z.array(HourlyForecastSchema),
  daily: z.array(DailyForecastSchema),
  airQuality: AirQualitySchema.optional(),
  alerts: z.array(WeatherAlertSchema).optional(),
});

export const LocationSearchSchema = z.object({
  name: z.string(),
  country: z.string(),
  state: z.string().optional(),
  lat: z.number(),
  lon: z.number(),
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type HourlyForecast = z.infer<typeof HourlyForecastSchema>;
export type DailyForecast = z.infer<typeof DailyForecastSchema>;
export type AirQuality = z.infer<typeof AirQualitySchema>;
export type WeatherAlert = z.infer<typeof WeatherAlertSchema>;
export type WeatherData = z.infer<typeof WeatherDataSchema>;
export type LocationSearch = z.infer<typeof LocationSearchSchema>;
