import type { HourlyForecast } from "@shared/weather-schema";
import { getWeatherIcon } from "@/lib/weather-icons";

interface HourlyForecastProps {
  forecast: HourlyForecast[];
  units: 'metric' | 'imperial';
}

export function HourlyForecast({ forecast, units }: HourlyForecastProps) {
  const unitSymbol = units === 'metric' ? '°' : '°';

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Hourly Forecast
      </h3>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {forecast.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {index === 0 ? 'Now' : hour.time}
              </div>
              <i className={`${getWeatherIcon(hour.icon)} text-2xl mb-2`}></i>
              <div className="font-semibold text-gray-900 dark:text-white">
                {hour.temperature}{unitSymbol}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {hour.precipitation}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
