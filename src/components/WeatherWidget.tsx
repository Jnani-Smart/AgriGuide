import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Sun, Cloud, CloudRain, CloudDrizzle, CloudSnow, CloudFog, CloudLightning, Wind, Loader } from 'lucide-react';
import type { RootState } from '../store';
import toast from 'react-hot-toast';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
  }[];
}

function WeatherWidget() {
  const profile = useSelector((state: RootState) => state.farmer.profile);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [normalizedLocation, setNormalizedLocation] = useState<string>('');

  // Function to normalize city names - corrects minor spelling mistakes and standardizes capitalization
  const normalizeLocationName = (location: string): string => {
    if (!location) return '';
    
    // Convert to lowercase first
    let normalized = location.toLowerCase().trim();
    
    // Capitalize first letter of each word
    normalized = normalized.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Common city name corrections (can be expanded with more cities as needed)
    const corrections: Record<string, string> = {
      'Banglore': 'Bangalore',
      'Dilli': 'Delhi',
      'Bombay': 'Mumbai',
      'Calcuta': 'Kolkata',
      'Calcutta': 'Kolkata',
      'Madras': 'Chennai',
      'Poone': 'Pune',
      'Hydrabad': 'Hyderabad',
      'Ahmedabad': 'Ahmedabad'
    };
    
    // Check if the normalized city name needs correction
    for (const [incorrect, correct] of Object.entries(corrections)) {
      if (normalized === incorrect) {
        return correct;
      }
    }
    
    return normalized;
  };
  
  useEffect(() => {
    let locationToUse = '';
    let refreshInterval: NodeJS.Timeout;
    
    if (profile?.city) {
      locationToUse = profile.city;
    }
    
    if (locationToUse) {
      const normalized = normalizeLocationName(locationToUse);
      setNormalizedLocation(normalized);
      fetchWeatherData(normalized);
      
      // Set up automatic refresh every 5 minutes
      refreshInterval = setInterval(() => {
        fetchWeatherData(normalized);
      }, 5 * 60 * 1000);
    } else {
      setNormalizedLocation('');
      setWeather(null);
    }

    // Cleanup interval on component unmount
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [profile?.city]);

  const fetchWeatherData = async (location: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Using OpenWeatherMap API (free tier)
      const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // This is a demo key, in production use environment variables
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location},in&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      // Process current weather
      const currentWeather = data.list[0];
      const forecastDays = data.list.filter((_: any, i: number) => i % 8 === 0).slice(1, 3);
      
      setWeather({
        temperature: Math.round(currentWeather.main.temp),
        condition: mapWeatherCondition(currentWeather.weather[0].main),
        humidity: currentWeather.main.humidity,
        rainfall: currentWeather.rain ? currentWeather.rain['3h'] || 0 : 0,
        forecast: forecastDays.map((day: any) => ({
          day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
          temp: Math.round(day.main.temp),
          condition: mapWeatherCondition(day.weather[0].main)
        }))
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Could not load weather data');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const mapWeatherCondition = (condition: string): string => {
    const conditionMap: Record<string, string> = {
      'Clear': 'Sunny',
      'Clouds': 'Partly Cloudy',
      'Rain': 'Rainy',
      'Drizzle': 'Drizzle',
      'Thunderstorm': 'Thunderstorm',
      'Snow': 'Snowy',
      'Mist': 'Foggy',
      'Fog': 'Foggy',
      'Haze': 'Foggy'
    };
    
    return conditionMap[condition] || condition;
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-2">
          <Loader className="h-5 w-5 animate-spin text-green-600" />
          <span className="text-sm">Loading weather...</span>
        </div>
      </div>
    );
  }
  
  if (error && !weather) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-2 text-red-500">
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }
  
  if (!weather) return null;

  const WeatherIcon = ({ condition, className = "h-6 w-6" }: { condition: string, className?: string }) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className={`${className} text-yellow-500`} />;
      case 'Partly Cloudy':
        return <Cloud className={`${className} text-gray-500`} />;
      case 'Rainy':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'Drizzle':
        return <CloudDrizzle className={`${className} text-blue-400`} />;
      case 'Thunderstorm':
        return <CloudLightning className={`${className} text-purple-500`} />;
      case 'Snowy':
        return <CloudSnow className={`${className} text-blue-200`} />;
      case 'Foggy':
        return <CloudFog className={`${className} text-gray-400`} />;
      case 'Windy':
        return <Wind className={`${className} text-gray-500`} />;
      default:
        return <Sun className={`${className} text-yellow-500`} />;
    }
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-auto'
      }`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {normalizedLocation ? (
          <>
            <div className="flex items-center space-x-3">
              <WeatherIcon condition={weather.condition} />
              <span className="font-medium text-lg">{weather.temperature}°C</span>
              <span className="text-base font-medium text-gray-700">{normalizedLocation}</span>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500">Set location in profile for weather</div>
        )}
        
        {isExpanded && profile && (weather) && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Humidity</span>
                <p className="font-medium">{weather.humidity}%</p>
              </div>
              <div>
                <span className="text-gray-600">Rainfall</span>
                <p className="font-medium">{weather.rainfall} mm</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Forecast</h4>
              <div className="space-y-2">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{day.day}</span>
                    <div className="flex items-center space-x-1">
                      <WeatherIcon condition={day.condition} className="h-4 w-4" />
                      <span className="font-medium">{day.temp}°C</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;