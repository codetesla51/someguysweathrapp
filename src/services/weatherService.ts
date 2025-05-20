import axios from 'axios';
import { WeatherData, ForecastData, LocationData } from '../types/weather';

// OpenWeatherMap API key - replace with your own API key
// https://openweathermap.org/api
const API_KEY = 'fe4feefa8543e06d4f3c66d92c61b69c'; // Free public API key for demo purposes
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a location
 */
export const getCurrentWeather = async (
  lat: number, 
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Fetches 5-day weather forecast for a location
 */
export const getForecast = async (
  lat: number, 
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Searches for locations by city name
 */
export const searchLocation = async (query: string): Promise<LocationData[]> => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

/**
 * Gets user's current location using browser geolocation API
 */
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};