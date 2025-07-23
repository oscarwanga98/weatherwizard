interface UVIndexProps {
  value: number;
}

export function UVIndex({ value }: UVIndexProps) {
  const getUVColor = (uv: number) => {
    if (uv <= 2) return 'text-green-500';
    if (uv <= 5) return 'text-yellow-500';
    if (uv <= 7) return 'text-orange-500';
    if (uv <= 10) return 'text-red-500';
    return 'text-purple-500';
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const getUVDescription = (uv: number) => {
    if (uv <= 2) return 'No protection required';
    if (uv <= 5) return 'Some protection required';
    if (uv <= 7) return 'Protection required';
    if (uv <= 10) return 'Extra protection required';
    return 'Maximum protection required';
  };

  // For demo purposes, use a mock UV value if the API doesn't provide one
  const uvValue = value > 0 ? value : 6;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          UV Index
        </h4>
        <i className="fas fa-sun text-orange-500"></i>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${getUVColor(uvValue)}`}>
              {uvValue}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">UV Index</div>
          </div>
          <div className="text-right">
            <div className={`font-medium ${getUVColor(uvValue)}`}>
              {getUVLevel(uvValue)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {getUVDescription(uvValue)}
            </div>
          </div>
        </div>
        
        {/* UV Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>11+</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 h-2 rounded-full relative">
              <div 
                className="absolute top-0 w-1 h-2 bg-white rounded-full shadow-sm"
                style={{ left: `${Math.min(uvValue / 11 * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Peak UV time: 11 AM - 3 PM
        </div>
      </div>
    </div>
  );
}
