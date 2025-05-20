import { useWeather } from '../hooks/useWeather';
import SearchBar from './SearchBar';
import UnitToggle from './UnitToggle';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center">
        <Cloud size={36} className="mr-2" />
        <h1 className="text-2xl font-bold">WeatherVue</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <SearchBar />
        <UnitToggle />
      </div>
    </motion.header>
  );
};

export default Header;