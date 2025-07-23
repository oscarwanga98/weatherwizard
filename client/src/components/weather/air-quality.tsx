import type { AirQuality } from "@shared/weather-schema";

interface AirQualityProps {
  data: AirQuality;
}

export function AirQuality({ data }: AirQualityProps) {
  const getAQIColor = (aqi: number) => {
    if (aqi === 1) return 'text-green-500';
    if (aqi === 2) return 'text-yellow-500';
    if (aqi === 3) return 'text-orange-500';
    if (aqi === 4) return 'text-red-500';
    return 'text-purple-500';
  };

  const getAQIBgColor = (aqi: number) => {
    if (aqi === 1) return 'bg-green-50 dark:bg-green-900/20';
    if (aqi === 2) return 'bg-yellow-50 dark:bg-yellow-900/20';
    if (aqi === 3) return 'bg-orange-50 dark:bg-orange-900/20';
    if (aqi === 4) return 'bg-red-50 dark:bg-red-900/20';
    return 'bg-purple-50 dark:bg-purple-900/20';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Air Quality
        </h4>
        <i className="fas fa-leaf text-green-500"></i>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${getAQIColor(data.aqi)}`}>
              {data.aqi}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">AQI</div>
          </div>
          <div className="text-right">
            <div className={`font-medium ${getAQIColor(data.aqi)}`}>
              {data.level}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {data.aqi === 1 && 'Air quality is satisfactory'}
              {data.aqi === 2 && 'Air quality is acceptable'}
              {data.aqi === 3 && 'May cause concern for sensitive people'}
              {data.aqi === 4 && 'May cause health effects'}
              {data.aqi === 5 && 'Health alert for everyone'}
            </div>
          </div>
        </div>
        
        {/* Air Quality Components */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className={`${getAQIBgColor(data.aqi)} rounded-lg p-3`}>
            <div className="text-gray-500 dark:text-gray-400">PM2.5</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {Math.round(data.pm25)} μg/m³
            </div>
          </div>
          <div className={`${getAQIBgColor(data.aqi)} rounded-lg p-3`}>
            <div className="text-gray-500 dark:text-gray-400">PM10</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {Math.round(data.pm10)} μg/m³
            </div>
          </div>
          <div className={`${getAQIBgColor(data.aqi)} rounded-lg p-3`}>
            <div className="text-gray-500 dark:text-gray-400">O3</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {Math.round(data.o3)} μg/m³
            </div>
          </div>
          <div className={`${getAQIBgColor(data.aqi)} rounded-lg p-3`}>
            <div className="text-gray-500 dark:text-gray-400">NO2</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {Math.round(data.no2)} μg/m³
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
