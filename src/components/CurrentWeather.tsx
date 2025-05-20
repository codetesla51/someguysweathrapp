import { motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import WeatherIcon from './WeatherIcon';
import { 
  formatTemperature, 
  formatDate, 
  isDaytime 
} from '../utils/helpers';
import { Droplets, Wind, Thermometer } from 'lucide-react';

const CurrentWeather = () => {
  const { currentWeather, isLoading, units } = useWeather();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (!currentWeather) {
    return null;
  }
  
  const { weather, main, wind, sys, name } = currentWeather;
  
  // Check if it's daytime at the location
  const daytime = isDaytime(sys.sunrise, sys.sunset);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden"
    >
      <div className="text-center mb-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold"
        >
          {name}, {sys.country}
        </motion.h2>
        <p className="text-lg opacity-80">
          {formatDate(currentWeather.dt)}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mr-4"
          >
            <WeatherIcon 
              weatherId={weather[0].id} 
              size={64} 
              animated={true} 
            />
          </motion.div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold"
            >
              {formatTemperature(main.temp, units)}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl capitalize"
            >
              {weather[0].description}
            </motion.p>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto"
        >
          <div className="flex items-center justify-center md:justify-start">
            <Thermometer size={20} className="mr-2" />
            <div>
              <p className="text-sm opacity-80">Feels like</p>
              <p className="font-medium">{formatTemperature(main.feels_like, units)}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <Droplets size={20} className="mr-2" />
            <div>
              <p className="text-sm opacity-80">Humidity</p>
              <p className="font-medium">{main.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <Wind size={20} className="mr-2" />
            <div>
              <p className="text-sm opacity-80">Wind</p>
              <p className="font-medium">
                {units === 'metric' ? `${wind.speed} m/s` : `${wind.speed} mph`}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;