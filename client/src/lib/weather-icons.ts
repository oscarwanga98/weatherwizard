// Map OpenWeatherMap icon codes to FontAwesome classes
export function getWeatherIcon(iconCode: string): string {
  const iconMap: Record<string, string> = {
    // Clear sky
    '01d': 'fas fa-sun text-yellow-500',
    '01n': 'fas fa-moon text-blue-200',
    
    // Few clouds
    '02d': 'fas fa-cloud-sun text-yellow-500',
    '02n': 'fas fa-cloud-moon text-blue-200',
    
    // Scattered clouds
    '03d': 'fas fa-cloud text-gray-400',
    '03n': 'fas fa-cloud text-gray-400',
    
    // Broken clouds
    '04d': 'fas fa-cloud text-gray-500',
    '04n': 'fas fa-cloud text-gray-500',
    
    // Shower rain
    '09d': 'fas fa-cloud-rain text-blue-500',
    '09n': 'fas fa-cloud-rain text-blue-500',
    
    // Rain
    '10d': 'fas fa-cloud-sun-rain text-blue-500',
    '10n': 'fas fa-cloud-rain text-blue-500',
    
    // Thunderstorm
    '11d': 'fas fa-bolt text-yellow-500',
    '11n': 'fas fa-bolt text-yellow-500',
    
    // Snow
    '13d': 'fas fa-snowflake text-blue-300',
    '13n': 'fas fa-snowflake text-blue-300',
    
    // Mist
    '50d': 'fas fa-smog text-gray-400',
    '50n': 'fas fa-smog text-gray-400',
  };

  return iconMap[iconCode] || 'fas fa-sun text-yellow-500';
}
