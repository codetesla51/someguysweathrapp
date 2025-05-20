import { useWeather } from '../hooks/useWeather';
import ForecastCard from './ForecastCard';

const Forecast = () => {
  const { dailyForecasts, units, isLoading } = useWeather();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (!dailyForecasts || dailyForecasts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
        {dailyForecasts.map((forecast, index) => (
          <ForecastCard 
            key={forecast.date} 
            forecast={forecast} 
            units={units}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;