import { motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';

const UnitToggle = () => {
  const { units, toggleUnits } = useWeather();
  
  return (
    <div className="relative inline-block">
      <div 
        className="flex items-center bg-white/20 backdrop-blur-md p-1 rounded-full cursor-pointer"
        onClick={toggleUnits}
      >
        <div className="relative flex items-center z-10">
          <div 
            className={`px-3 py-1 rounded-full transition-colors ${
              units === 'metric' ? 'text-gray-800' : 'text-white'
            }`}
          >
            °C
          </div>
          <div 
            className={`px-3 py-1 rounded-full transition-colors ${
              units === 'imperial' ? 'text-gray-800' : 'text-white'
            }`}
          >
            °F
          </div>
          
          {/* Sliding background indicator */}
          <motion.div 
            className="absolute top-0 left-0 bg-white rounded-full h-full w-10 z-0"
            initial={false}
            animate={{
              x: units === 'metric' ? 0 : 37
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
      </div>
    </div>
  );
};

export default UnitToggle;