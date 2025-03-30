import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Sun, Cloud, CloudRain, CloudDrizzle, CloudSnow, CloudFog, CloudLightning, Wind, Loader, AlertCircle } from 'lucide-react';
import type { RootState } from '../store';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [normalizedLocation, setNormalizedLocation] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

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

  // Function to hide error message after a delay
  const startErrorHideTimer = () => {
    // Clear any existing timer
    if (timer) {
      clearTimeout(timer);
    }
    
    // Set widget to be visible
    setIsVisible(true);
    setShowError(true);
    
    // Start a new timer to hide the error after 30 seconds
    const newTimer = setTimeout(() => {
      setShowError(false);
      setIsVisible(weather !== null); // Keep visible if weather data exists
    }, 30000); // 30 seconds
    
    setTimer(newTimer);
  };
  
  // Reset error timer if user interacts with the error
  const resetErrorTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setShowError(true);
    setIsVisible(true);
    
    const newTimer = setTimeout(() => {
      setShowError(false);
      setIsVisible(weather !== null); // Keep visible if weather data exists
    }, 30000); // 30 seconds
    
    setTimer(newTimer);
  };
  
  useEffect(() => {
    let locationToUse = '';
    let refreshInterval: number | undefined;
    
    if (profile?.city) {
      locationToUse = profile.city;
    }
    
    if (locationToUse) {
      const normalized = normalizeLocationName(locationToUse);
      setNormalizedLocation(normalized);
      fetchWeatherData(normalized);
      
      // Set up automatic refresh every 5 minutes
      refreshInterval = window.setInterval(() => {
        fetchWeatherData(normalized);
      }, 5 * 60 * 1000);
      
      // Make widget visible without auto-hide when location is valid
      setIsVisible(true);
    } else {
      setNormalizedLocation('');
      setWeather(null);
      setIsVisible(false);
      setShowError(false);
      if (timer) {
        clearTimeout(timer);
      }
    }

    // Cleanup interval on component unmount
    return () => {
      if (refreshInterval) {
        window.clearInterval(refreshInterval);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [profile?.city]);

  const fetchWeatherData = async (location: string) => {
    setIsLoading(true);
    setError(null);
    setShowError(false);
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
        condition: currentWeather.weather[0].main, // Store the original condition
        humidity: currentWeather.main.humidity,
        rainfall: currentWeather.rain ? currentWeather.rain['3h'] || 0 : 0,
        forecast: forecastDays.map((day: any) => ({
          day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
          temp: Math.round(day.main.temp),
          condition: day.weather[0].main // Store the original condition
        }))
      });
      
      // Make widget visible without auto-hide
      setIsVisible(true);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Could not load weather data');
      setWeather(null);
      setShowError(true);
      setIsVisible(true);
      startErrorHideTimer(); // Show error message for 30 seconds
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to get appropriate weather icon based on raw condition
  const getWeatherIconComponent = (condition: string, className = "h-6 w-6") => {
    // Map API weather conditions to icons
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className={`${className} text-yellow-500`} />;
      case 'clouds':
        return <Cloud className={`${className} text-gray-500`} />;
      case 'rain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${className} text-blue-400`} />;
      case 'thunderstorm':
        return <CloudLightning className={`${className} text-purple-500`} />;
      case 'snow':
        return <CloudSnow className={`${className} text-blue-200`} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog className={`${className} text-gray-400`} />;
      default:
        return <Sun className={`${className} text-yellow-500`} />;
    }
  };

  // Get readable weather condition from API condition
  const getReadableCondition = (condition: string): string => {
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

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && 
          !widgetRef.current.contains(event.target as Node) && 
          isExpanded) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // If no city is given, don't show anything
  if (!profile?.city) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Loader className="h-5 w-5 animate-spin text-green-600" />
          <span className="text-sm">{t('weather.loading')}</span>
        </div>
      </div>
    );
  }
  
  if (showError && error) {
    return (
      <div 
        className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in"
        onClick={resetErrorTimer}
      >
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{t('weather.error')}: {normalizedLocation}</span>
        </div>
      </div>
    );
  }
  
  if (!weather && !showError) return null;

  return (
    <div 
      ref={widgetRef}
      className={`fixed bottom-4 right-4 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-auto'
      } ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
      }}
    >
      <div className="p-4 cursor-pointer">
        {normalizedLocation && weather && (
          <>
            <div className="flex items-center space-x-3">
              {getWeatherIconComponent(weather.condition)}
              <span className="font-medium text-xl tracking-tight">{weather.temperature}°C</span>
              <span className="text-base font-medium text-gray-700 tracking-normal">{normalizedLocation}</span>
            </div>
          </>
        )}
        
        {isExpanded && profile && weather && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-gray-600 text-xs tracking-wide">{t('weather.humidity')}</span>
                <p className="font-medium text-lg">{weather.humidity}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-600 text-xs tracking-wide">{t('weather.rainfall')}</span>
                <p className="font-medium text-lg">{weather.rainfall} mm</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">{t('weather.forecast')}</h4>
              <div className="space-y-3">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm tracking-wide">{day.day}</span>
                    <div className="flex items-center space-x-2">
                      {getWeatherIconComponent(day.condition, "h-5 w-5")}
                      <span className="font-medium text-base">{day.temp}°C</span>
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