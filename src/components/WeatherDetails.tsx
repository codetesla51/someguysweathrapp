import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';
import { 
  Sunrise, 
  Sunset, 
  Gauge, 
  Eye, 
  Droplets 
} from 'lucide-react';

const WeatherDetails = () => {
  const { currentWeather, isLoading } = useWeather();
  
  if (isLoading || !currentWeather) {
    return null;
  }
  
  const { main, visibility, sys } = currentWeather;
  
  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  const detailItems = [
    {
      icon: <Sunrise size={24} />,
      label: 'Sunrise',
      value: formatTime(sys.sunrise)
    },
    {
      icon: <Sunset size={24} />,
      label: 'Sunset',
      value: formatTime(sys.sunset)
    },
    {
      icon: <Gauge size={24} />,
      label: 'Pressure',
      value: `${main.pressure} hPa`
    },
    {
      icon: <Eye size={24} />,
      label: 'Visibility',
      value: `${Math.round(visibility / 1000)} km`
    },
    {
      icon: <Droplets size={24} />,
      label: 'Humidity',
      value: `${main.humidity}%`
    }
  ];
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {detailItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="flex flex-col items-center p-3 rounded-lg bg-white/10 backdrop-blur-md"
          >
            <div className="mb-2">
              {item.icon}
            </div>
            <p className="text-sm opacity-80">{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;