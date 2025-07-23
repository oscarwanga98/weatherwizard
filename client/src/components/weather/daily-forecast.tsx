import type { DailyForecast } from "@shared/weather-schema";
import { getWeatherIcon } from "@/lib/weather-icons";

interface DailyForecastProps {
  forecast: DailyForecast[];
  units: 'metric' | 'imperial';
}

export function DailyForecast({ forecast, units }: DailyForecastProps) {
  const unitSymbol = units === 'metric' ? '°' : '°';

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        5-Day Forecast
      </h3>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="text-gray-900 dark:text-white font-medium w-20">
                {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : day.dayName}
              </div>
              <i className={`${getWeatherIcon(day.icon)} text-2xl w-8 text-center`}></i>
              <div className="text-gray-600 dark:text-gray-400">
                {day.condition}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {day.precipitation}%
              </div>
              <div className="text-gray-900 dark:text-white font-semibold">
                <span>{day.high}{unitSymbol}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {day.low}{unitSymbol}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
