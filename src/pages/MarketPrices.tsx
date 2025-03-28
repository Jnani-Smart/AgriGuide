import React, { useState, useEffect } from 'react';
import { LineChart, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Select from 'react-select';
import toast from 'react-hot-toast';

// This would be fetched from an API in a real application
const getRandomPriceChange = (basePrice: number) => {
  const change = Math.floor(Math.random() * 100) - 20; // Random change between -20 and +80
  return Math.max(1000, basePrice + change); // Ensure price doesn't go below 1000
};

const initialMarketPriceData = {
  'Rice': {
    current: 2000,
    history: [1950, 1980, 2000, 2050, 1990],
    trend: 'up',
    unit: 'per quintal'
  },
  'Wheat': {
    current: 2200,
    history: [2100, 2150, 2200, 2180, 2220],
    trend: 'stable',
    unit: 'per quintal'
  },
  'Cotton': {
    current: 6500,
    history: [6200, 6300, 6400, 6500, 6450],
    trend: 'up',
    unit: 'per quintal'
  },
  'Sugarcane': {
    current: 350,
    history: [320, 330, 340, 350, 355],
    trend: 'up',
    unit: 'per quintal'
  }
};

function MarketPrices() {
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');
  const [isLoading, setIsLoading] = useState(false);
  const [marketPriceData, setMarketPriceData] = useState(initialMarketPriceData);

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedCrop]);

  useEffect(() => {
    // Update prices every 30 seconds to simulate real-time data
    const priceUpdateInterval = setInterval(() => {
      setMarketPriceData(prevData => {
        const newData = {...prevData};
        Object.keys(newData).forEach(crop => {
          const newPrice = getRandomPriceChange(initialMarketPriceData[crop].current);
          newData[crop] = {
            ...newData[crop],
            current: newPrice,
            history: [...newData[crop].history.slice(1), newPrice],
            trend: newPrice > newData[crop].current ? 'up' : 
                  newPrice < newData[crop].current ? 'down' : 'stable'
          };
        });
        return newData;
      });
    }, 30000);

    return () => clearInterval(priceUpdateInterval);
  }, []);

  const cropOptions = Object.keys(marketPriceData).map(crop => ({
    value: crop,
    label: crop
  }));

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <ArrowRight className="h-5 w-5 text-gray-600" />;
    }
  };
  
  const handleCropChange = (option: any) => {
    setSelectedCrop(option?.value || 'Rice');
    toast.success(`Showing prices for ${option?.value || 'Rice'}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center space-x-2 mb-8">
        <LineChart className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Market Prices</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Crop
          </label>
          <Select
            options={cropOptions}
            value={cropOptions.find(option => option.value === selectedCrop)}
            onChange={handleCropChange}
            className="w-full max-w-xs"
            isDisabled={isLoading}
            classNames={{
              control: (state) => state.isFocused ? 'border-green-500' : 'border-gray-300',
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Current Price</h2>
            {isLoading ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-2xl md:text-3xl font-bold">₹{marketPriceData[selectedCrop].current}</span>
                <span className="text-gray-600">{marketPriceData[selectedCrop].unit}</span>
                {getTrendIcon(marketPriceData[selectedCrop].trend)}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Price History</h2>
            {isLoading ? (
              <div className="animate-pulse h-40 flex items-end space-x-2">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="bg-gray-300 rounded-t w-full" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                ))}
              </div>
            ) : (
              <div className="h-40 flex items-end space-x-2">
                {marketPriceData[selectedCrop].history.map((price, index) => (
                  <div
                    key={index}
                    className="bg-green-600 rounded-t w-full relative"
                    style={{
                      height: `${(price / marketPriceData[selectedCrop].current) * 100}%`
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-center bg-gray-800 text-white px-2 py-1 rounded font-medium">
                      ₹{price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Insights</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                <span>Current price is {marketPriceData[selectedCrop].trend === 'up' ? 'trending upward' : 'stable'}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span>Best time to sell: Next 2-3 weeks</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                <span>Market demand is high</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPrices;