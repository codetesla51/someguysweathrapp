import { motion } from 'framer-motion';
import { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../utils/helpers';

interface ForecastCardProps {
  forecast: DailyForecast;
  units: 'metric' | 'imperial';
  index: number;
}

const ForecastCard = ({ forecast, units, index }: ForecastCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="rounded-lg py-3 px-2 text-center flex flex-col items-center"
    >
      <p className="font-medium mb-2">{forecast.day}</p>
      
      <div className="my-2">
        <WeatherIcon weatherId={forecast.weather.id} size={30} animated={true} />
      </div>
      
      <div className="flex items-center justify-center space-x-2 mt-1">
        <span className="font-bold">
          {formatTemperature(forecast.temp_max, units)}
        </span>
        <span className="opacity-70">
          {formatTemperature(forecast.temp_min, units)}
        </span>
      </div>
      
      <p className="text-xs mt-1 opacity-80 capitalize">
        {forecast.weather.description}
      </p>
    </motion.div>
  );
};

export default ForecastCard;