import { useTheme } from "@/hooks/use-theme.tsx";

interface HeaderProps {
  units: 'metric' | 'imperial';
  onUnitsChange: (units: 'metric' | 'imperial') => void;
  onLocationClick: () => void;
}

export function Header({ units, onUnitsChange, onLocationClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <i className="fas fa-cloud-sun text-2xl text-blue-500 dark:text-blue-400"></i>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">WeatherSync</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Temperature Unit Toggle */}
            <div className="flex items-center bg-gray-90 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onUnitsChange('metric')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  units === 'metric'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUnitsChange('imperial')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  units === 'imperial'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                °F
              </button>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              {theme === 'dark' ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            
            {/* Location Button */}
            <button
              onClick={onLocationClick}
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200"
            >
              <i className="fas fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
