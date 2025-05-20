import React, { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { isDaytime, getWeatherTheme } from './utils/helpers';
import { motion } from 'framer-motion';

// Components
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const { currentWeather, isLoading, error } = useWeather();
  
  // Set document title based on current weather
  useEffect(() => {
    if (currentWeather) {
      document.title = `${Math.round(currentWeather.main.temp)}° | ${currentWeather.name} | WeatherVue`;
    } else {
      document.title = 'WeatherVue';
    }
  }, [currentWeather]);
  
  // Determine theme based on current weather conditions
  const getThemeClasses = () => {
    if (!currentWeather) {
      return {
        bgGradient: 'from-blue-500 to-purple-600',
        textColor: 'text-white',
        cardBg: 'bg-white/20 backdrop-blur-md',
        accentColor: 'text-blue-100'
      };
    }
    
    const daytime = isDaytime(
      currentWeather.sys.sunrise,
      currentWeather.sys.sunset
    );
    
    return getWeatherTheme(currentWeather.weather[0].id, daytime);
  };
  
  const theme = getThemeClasses();
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} ${theme.textColor} transition-colors duration-1000`}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        
        {error && (
          <div className="bg-red-500/80 text-white p-4 rounded-lg mt-4">
            {error}
          </div>
        )}
        
        {isLoading && !currentWeather ? (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-8"
          >
            <div className={`p-6 rounded-xl ${theme.cardBg} shadow-lg mb-6`}>
              <CurrentWeather />
            </div>
            
            <div className={`p-6 rounded-xl ${theme.cardBg} shadow-lg`}>
              <Forecast />
              <WeatherDetails />
            </div>
          </motion.main>
        )}
      </div>
    </div>
  );
}

export default App;