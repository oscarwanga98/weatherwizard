import type { CurrentWeather } from "@shared/weather-schema";
import { getWeatherIcon } from "@/lib/weather-icons";

interface CurrentWeatherProps {
  weather: CurrentWeather;
  units: 'metric' | 'imperial';
}

export function CurrentWeather({ weather, units }: CurrentWeatherProps) {
  const { location, current } = weather;
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'km/h' : 'mph';

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-xl text-white overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Location and Date */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {location.city}, {location.country}
            </h2>
            <p className="text-blue-100 text-lg">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Main Weather Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Temperature and Condition */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                {/* Weather Icon */}
                <div className="text-6xl sm:text-7xl animate-float">
                  <i className={`${getWeatherIcon(current.icon)} text-yellow-300`}></i>
                </div>
                <div>
                  <div className="text-5xl sm:text-6xl font-bold">
                    {current.temperature}{unitSymbol}
                  </div>
                  <div className="text-xl text-blue-100">{current.condition}</div>
                </div>
              </div>
              <div className="text-blue-100">
                Feels like <span className="font-semibold">{current.feelsLike}{unitSymbol}</span>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <i className="fas fa-eye text-2xl text-blue-200 mb-2"></i>
                <div className="text-sm text-blue-100">Visibility</div>
                <div className="text-lg font-semibold">{current.visibility} km</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <i className="fas fa-tint text-2xl text-blue-200 mb-2"></i>
                <div className="text-sm text-blue-100">Humidity</div>
                <div className="text-lg font-semibold">{current.humidity}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <i className="fas fa-wind text-2xl text-blue-200 mb-2"></i>
                <div className="text-sm text-blue-100">Wind</div>
                <div className="text-lg font-semibold">{current.windSpeed} {speedUnit}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <i className="fas fa-thermometer-half text-2xl text-blue-200 mb-2"></i>
                <div className="text-sm text-blue-100">Pressure</div>
                <div className="text-lg font-semibold">{current.pressure} mb</div>
              </div>
            </div>
          </div>

          {/* Sun Times */}
          <div className="mt-6 pt-6 border-t border-blue-400">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-sun text-yellow-300"></i>
                <div>
                  <div className="text-sm text-blue-100">Sunrise</div>
                  <div className="font-semibold">{current.sunrise}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-moon text-blue-200"></i>
                <div>
                  <div className="text-sm text-blue-100">Sunset</div>
                  <div className="font-semibold">{current.sunset}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
