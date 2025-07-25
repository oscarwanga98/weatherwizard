import { useState } from "react";
import { Header } from "@/components/layout/header";
import { SearchBar } from "@/components/weather/search-bar";
import { CurrentWeather } from "@/components/weather/current-weather";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { DailyForecast } from "@/components/weather/daily-forecast";
import { AirQuality } from "@/components/weather/air-quality";
import { UVIndex } from "@/components/weather/uv-index";
import { WeatherAlerts } from "@/components/weather/weather-alerts";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useWeather } from "@/hooks/use-weather";
import { useGeolocation } from "@/hooks/use-geolocation";

export default function Home() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  
  const { 
    data: weatherData, 
    isLoading: isWeatherLoading, 
    error: weatherError 
  } = useWeather(coordinates, units);
  
  const { 
    getCurrentLocation, 
    isLoading: isLocationLoading 
  } = useGeolocation();
//boss
  const handleLocationSelect = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  const handleGetCurrentLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      setCoordinates(coords);
    } catch (error) {
      console.error('Failed to get current location:', error);
    }
  };

  const isLoading = isWeatherLoading || isLocationLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <Header 
        units={units}
        onUnitsChange={setUnits}
        onLocationClick={handleGetCurrentLocation}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar onLocationSelect={handleLocationSelect} />
        
        {weatherData && (
          <>
            <CurrentWeather 
              weather={weatherData.current} 
              units={units}
            />
            
            <HourlyForecast 
              forecast={weatherData.hourly} 
              units={units}
            />
            
            <DailyForecast 
              forecast={weatherData.daily} 
              units={units}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {weatherData.airQuality && (
                <AirQuality data={weatherData.airQuality} />
              )}
              <UVIndex value={weatherData.current.current.uvIndex} />
            </div>
            
            {weatherData.alerts && weatherData.alerts.length > 0 && (
              <WeatherAlerts alerts={weatherData.alerts} />
            )}
          </>
        )}
        
        {weatherError && (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-red-600 dark:text-red-400 mb-2">
                <i className="fas fa-exclamation-triangle text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                Unable to load weather data
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {weatherError instanceof Error ? weatherError.message : 'Please try again later'}
              </p>
            </div>
          </div>
        )}
        
        {!weatherData && !weatherError && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <i className="fas fa-map-marker-alt text-4xl text-blue-500 dark:text-blue-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select a location
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Search for a city above or use your current location to get started
              </p>
              <button
                onClick={handleGetCurrentLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-location-arrow mr-2"></i>
                Use Current Location
              </button>
            </div>
          </div>
        )}
      </main>
      
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
