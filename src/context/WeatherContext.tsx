import { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  WeatherData, 
  ForecastData, 
  LocationData, 
  WeatherContextType,
  DailyForecast,
  Unit
} from '../types/weather';
import { 
  getCurrentWeather, 
  getForecast, 
  searchLocation, 
  getUserLocation 
} from '../services/weatherService';
import { extractDailyForecasts } from '../utils/helpers';

// Create context with default values
export const WeatherContext = createContext<WeatherContextType>({
  currentWeather: null,
  forecast: null,
  dailyForecasts: [],
  isLoading: false,
  error: null,
  location: null,
  searchResults: [],
  units: 'metric',
  fetchWeather: async () => {},
  searchLocations: async () => {},
  setLocation: () => {},
  toggleUnits: () => {},
});

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [units, setUnits] = useState<Unit>('metric');

  // Fetch weather data based on coordinates
  const fetchWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon, units),
        getForecast(lat, lon, units),
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      if (forecastData) {
        const daily = extractDailyForecasts(forecastData);
        setDailyForecasts(daily);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Search locations by query
  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const results = await searchLocation(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Error searching locations:', err);
      setError('Failed to search locations. Please try again.');
    }
  };

  // Set selected location and fetch its weather
  const handleSetLocation = (locationData: LocationData) => {
    setLocation(locationData);
    fetchWeather(locationData.lat, locationData.lon);
    setSearchResults([]);
  };

  // Toggle between metric and imperial units
  const toggleUnits = () => {
    setUnits(prev => {
      const newUnits = prev === 'metric' ? 'imperial' : 'metric';
      
      // Refetch weather with new units if we have a location
      if (location) {
        fetchWeather(location.lat, location.lon);
      }
      
      return newUnits;
    });
  };

  // Fetch local weather on initial load
  useEffect(() => {
    const getLocalWeather = async () => {
      try {
        setIsLoading(true);
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        
        // Get city name from coordinates
        const locations = await searchLocation(`${latitude},${longitude}`);
        
        if (locations && locations.length > 0) {
          setLocation(locations[0]);
          fetchWeather(latitude, longitude);
        }
      } catch (err) {
        console.error('Error getting local weather:', err);
        // If geolocation fails, use a default location
        const defaultLocation = {
          name: 'New York',
          country: 'US',
          lat: 40.7128,
          lon: -74.0060
        };
        setLocation(defaultLocation);
        fetchWeather(defaultLocation.lat, defaultLocation.lon);
      } finally {
        setIsLoading(false);
      }
    };

    getLocalWeather();
  }, []);

  const value = {
    currentWeather,
    forecast,
    dailyForecasts,
    isLoading,
    error,
    location,
    searchResults,
    units,
    fetchWeather,
    searchLocations,
    setLocation: handleSetLocation,
    toggleUnits,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};