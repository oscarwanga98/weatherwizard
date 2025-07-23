import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "@shared/weather-schema";

export function useWeather(
  coordinates: { lat: number; lon: number } | null,
  units: 'metric' | 'imperial' = 'metric'
) {
  return useQuery<WeatherData>({
    queryKey: ['/api/weather', coordinates?.lat, coordinates?.lon, `?units=${units}`],
    enabled: !!coordinates,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
}
