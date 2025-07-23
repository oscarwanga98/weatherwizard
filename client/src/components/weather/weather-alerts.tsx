import type { WeatherAlert } from "@shared/weather-schema";

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'minor':
        return 'from-yellow-500 to-yellow-600';
      case 'moderate':
        return 'from-orange-500 to-orange-600';
      case 'severe':
        return 'from-red-500 to-red-600';
      case 'extreme':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-red-500 to-red-600';
    }
  };

  return (
    <div className="mb-8">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-gradient-to-r ${getSeverityColor(alert.severity)} rounded-2xl shadow-lg text-white p-6 mb-4`}
        >
          <div className="flex items-start space-x-3">
            <i className="fas fa-exclamation-triangle text-2xl text-yellow-300 flex-shrink-0 mt-1"></i>
            <div>
              <h4 className="text-lg font-semibold mb-2">{alert.title}</h4>
              <p className="text-red-100 mb-3">{alert.description}</p>
              <div className="flex items-center space-x-4 text-sm text-red-200">
                <span>Issued: {new Date(alert.issued).toLocaleString()}</span>
                <span>Expires: {new Date(alert.expires).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
