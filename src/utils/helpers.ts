import { ForecastData, DailyForecast } from '../types/weather';

/**
 * Converts temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Converts temperature from Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

/**
 * Gets the appropriate temperature unit symbol
 */
export const getUnitSymbol = (unit: 'metric' | 'imperial'): string => {
  return unit === 'metric' ? '°C' : '°F';
};

/**
 * Formats temperature with the appropriate unit
 */
export const formatTemperature = (temp: number, unit: 'metric' | 'imperial'): string => {
  return `${Math.round(temp)}${getUnitSymbol(unit)}`;
};

/**
 * Formats wind speed with the appropriate unit
 */
export const formatWindSpeed = (speed: number, unit: 'metric' | 'imperial'): string => {
  return unit === 'metric' ? `${speed} m/s` : `${speed} mph`;
};

/**
 * Formats date to a readable string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Gets the day of the week from a timestamp
 */
export const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Extracts daily forecasts from the 3-hour forecast data
 */
export const extractDailyForecasts = (forecastData: ForecastData): DailyForecast[] => {
  const dailyData: { [key: string]: DailyForecast } = {};
  
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!dailyData[date]) {
      dailyData[date] = {
        day: getDayOfWeek(item.dt),
        weather: item.weather[0],
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        date
      };
    } else {
      // Update min/max if needed
      if (item.main.temp_min < dailyData[date].temp_min) {
        dailyData[date].temp_min = item.main.temp_min;
      }
      if (item.main.temp_max > dailyData[date].temp_max) {
        dailyData[date].temp_max = item.main.temp_max;
      }
    }
  });
  
  // Convert to array and take only the first 5 days
  return Object.values(dailyData).slice(0, 5);
};

/**
 * Gets weather condition based theme colors
 */
export const getWeatherTheme = (weatherId: number, isDaytime: boolean) => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  
  // Clear sky
  if (weatherId === 800) {
    return isDaytime 
      ? { 
          bgGradient: 'from-sky-400 to-blue-500',
          textColor: 'text-white',
          cardBg: 'bg-white/20 backdrop-blur-md',
          accentColor: 'text-yellow-300'
        }
      : {
          bgGradient: 'from-indigo-900 to-blue-900',
          textColor: 'text-white',
          cardBg: 'bg-gray-800/40 backdrop-blur-md',
          accentColor: 'text-blue-300'
        };
  }
  
  // Few clouds, scattered clouds
  if (weatherId >= 801 && weatherId <= 802) {
    return isDaytime
      ? {
          bgGradient: 'from-blue-400 to-sky-300',
          textColor: 'text-gray-800',
          cardBg: 'bg-white/30 backdrop-blur-md',
          accentColor: 'text-blue-800'
        }
      : {
          bgGradient: 'from-gray-900 to-blue-800',
          textColor: 'text-white',
          cardBg: 'bg-gray-800/40 backdrop-blur-md',
          accentColor: 'text-blue-300'
        };
  }
  
  // Broken clouds, overcast
  if (weatherId >= 803 && weatherId <= 804) {
    return {
      bgGradient: 'from-gray-400 to-gray-600',
      textColor: 'text-white',
      cardBg: 'bg-gray-700/30 backdrop-blur-md',
      accentColor: 'text-gray-200'
    };
  }
  
  // Rain, drizzle
  if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return {
      bgGradient: 'from-gray-700 to-blue-900',
      textColor: 'text-white',
      cardBg: 'bg-gray-800/40 backdrop-blur-md',
      accentColor: 'text-blue-300'
    };
  }
  
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return {
      bgGradient: 'from-gray-900 to-purple-900',
      textColor: 'text-white',
      cardBg: 'bg-gray-900/50 backdrop-blur-md',
      accentColor: 'text-purple-300'
    };
  }
  
  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    return {
      bgGradient: 'from-gray-100 to-blue-100',
      textColor: 'text-gray-800',
      cardBg: 'bg-white/70 backdrop-blur-md',
      accentColor: 'text-blue-500'
    };
  }
  
  // Atmosphere (fog, mist, etc)
  if (weatherId >= 700 && weatherId < 800) {
    return {
      bgGradient: 'from-gray-400 to-gray-500',
      textColor: 'text-gray-800',
      cardBg: 'bg-gray-300/50 backdrop-blur-md',
      accentColor: 'text-gray-700'
    };
  }
  
  // Default theme
  return isDaytime
    ? {
        bgGradient: 'from-blue-500 to-sky-400',
        textColor: 'text-white',
        cardBg: 'bg-white/20 backdrop-blur-md',
        accentColor: 'text-blue-100'
      }
    : {
        bgGradient: 'from-gray-800 to-blue-900',
        textColor: 'text-white',
        cardBg: 'bg-gray-800/40 backdrop-blur-md',
        accentColor: 'text-blue-300'
      };
};

/**
 * Determines if it's currently daytime at a location
 */
export const isDaytime = (sunrise: number, sunset: number): boolean => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  return now >= sunrise && now < sunset;
};