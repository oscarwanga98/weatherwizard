import { useTheme } from "@/hooks/use-theme.tsx";

interface HeaderProps {
  units: 'metric' | 'imperial';
  onUnitsChange: (units: 'metric' | 'imperial') => void;
  onLocationClick: () => void;
}

export function Header({ units, onUnitsChange, onLocationClick }: HeaderProps) {
  const { theme, seasonalTheme, toggleTheme, toggleSeasonalTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 cosmic:bg-purple-950/80 christmas:bg-red-50/90 halloween:bg-orange-50/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 cosmic:border-purple-700/50 christmas:border-red-200 halloween:border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <i className="fas fa-cloud-sun text-2xl text-blue-500 dark:text-blue-400 cosmic:text-purple-400 christmas:text-red-500 halloween:text-orange-500"></i>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white cosmic:text-purple-100 christmas:text-red-800 halloween:text-orange-800">WeatherSync</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Temperature Unit Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 cosmic:bg-purple-900/30 christmas:bg-red-50 halloween:bg-orange-50 rounded-lg p-1">
              <button
                onClick={() => onUnitsChange('metric')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  units === 'metric'
                    ? 'bg-blue-500 dark:bg-blue-600 cosmic:bg-purple-600 christmas:bg-red-600 halloween:bg-orange-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 cosmic:text-purple-200 christmas:text-red-700 halloween:text-orange-700 hover:bg-gray-200 dark:hover:bg-gray-600 cosmic:hover:bg-purple-800/50 christmas:hover:bg-red-100 halloween:hover:bg-orange-100'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUnitsChange('imperial')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  units === 'imperial'
                    ? 'bg-blue-500 dark:bg-blue-600 cosmic:bg-purple-600 christmas:bg-red-600 halloween:bg-orange-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 cosmic:text-purple-200 christmas:text-red-700 halloween:text-orange-700 hover:bg-gray-200 dark:hover:bg-gray-600 cosmic:hover:bg-purple-800/50 christmas:hover:bg-red-100 halloween:hover:bg-orange-100'
                }`}
              >
                °F
              </button>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 cosmic:bg-purple-900/50 christmas:bg-red-100 halloween:bg-orange-100 text-gray-600 dark:text-gray-300 cosmic:text-purple-200 christmas:text-red-600 halloween:text-orange-600 hover:bg-gray-200 dark:hover:bg-gray-600 cosmic:hover:bg-purple-800/50 christmas:hover:bg-red-200 halloween:hover:bg-orange-200 transition-all duration-200"
              title={`Current theme: ${theme}. Click to cycle themes.`}
            >
              {theme === 'light' && <i className="fas fa-sun text-yellow-500"></i>}
              {theme === 'dark' && <i className="fas fa-moon text-blue-300"></i>}
              {theme === 'cosmic' && <i className="fas fa-star text-purple-400"></i>}
            </button>
            
            {/* Seasonal Theme Toggle */}
            <button
              onClick={toggleSeasonalTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 cosmic:bg-purple-900/50 christmas:bg-green-100 halloween:bg-purple-100 text-gray-600 dark:text-gray-300 cosmic:text-purple-200 christmas:text-green-600 halloween:text-purple-600 hover:bg-gray-200 dark:hover:bg-gray-600 cosmic:hover:bg-purple-800/50 christmas:hover:bg-green-200 halloween:hover:bg-purple-200 transition-all duration-200"
              title={`Current seasonal theme: ${seasonalTheme}. Click to cycle seasonal themes.`}
            >
              {seasonalTheme === 'none' && <i className="fas fa-calendar text-gray-500"></i>}
              {seasonalTheme === 'christmas' && <i className="fas fa-gift text-red-500 seasonal-effect"></i>}
              {seasonalTheme === 'halloween' && <i className="fas fa-pumpkin text-orange-500 seasonal-effect"></i>}
            </button>
            
            {/* Location Button */}
            <button
              onClick={onLocationClick}
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 cosmic:bg-purple-900/40 christmas:bg-green-100 halloween:bg-purple-100 text-blue-600 dark:text-blue-400 cosmic:text-purple-300 christmas:text-green-700 halloween:text-purple-700 hover:bg-blue-200 dark:hover:bg-blue-800 cosmic:hover:bg-purple-800/60 christmas:hover:bg-green-200 halloween:hover:bg-purple-200 transition-all duration-200"
            >
              <i className="fas fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
