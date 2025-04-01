import React, { useState, useEffect } from 'react';
import { LineChart, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Select from 'react-select';
import { useLanguage } from '../contexts/LanguageContext';

// Define API response record type
interface MarketRecord {
  commodity: string;
  market: string;
  state: string;
  district: string;
  modal_price: string;
  price_unit: string;
  arrival_date: string;
}

// Helper function to display relative time since last update
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  
  return Math.floor(seconds) + " seconds ago";
};

const fetchMarketPrices = async (crop: string) => {
  try {
    // Tamil Nadu specific API filter parameter
    const stateFilter = "Tamil%20Nadu";
    const cropMappings: Record<string, string> = {
      "Rice": "Paddy",
      "Black Gram": "Black Gram (Urd)",
      "Groundnut": "Groundnut Pods",
      "Turmeric": "Turmeric",
      "Coconut": "Coconut",
      "Banana": "Banana",
      "Sugarcane": "Sugarcane",
      "Cotton": "Cotton",
      "Chillies": "Dry Chillies",
      "Ragi": "Ragi (Finger Millet)"
    };

    // Use the mapped crop name for the API or the original if no mapping exists
    const apiCropName = cropMappings[crop] || crop;
    
    // Using Agmarknet API for Indian market prices - with filters for Tamil Nadu
    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?` + 
      `api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b` + 
      `&format=json` + 
      `&filters[commodity]=${encodeURIComponent(apiCropName)}` + 
      `&filters[state]=${stateFilter}` + 
      `&limit=5` +
      `&sort[arrival_date]=desc`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch market prices');
    }
    
    const data = await response.json();
    
    if (!data.records || data.records.length === 0) {
      // If no data for Tamil Nadu, try without state filter as fallback
      const fallbackResponse = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?` + 
        `api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b` + 
        `&format=json` + 
        `&filters[commodity]=${encodeURIComponent(apiCropName)}` + 
        `&limit=1` +
        `&sort[arrival_date]=desc`
      );
      
      if (!fallbackResponse.ok) {
        throw new Error('Failed to fetch market prices');
      }
      
      const fallbackData = await fallbackResponse.json();
      
      if (!fallbackData.records || fallbackData.records.length === 0) {
        // If still no data, use default values from our initialMarketPriceData
        const defaultData = initialMarketPriceData[crop];
        return {
          current: defaultData.current,
          unit: defaultData.unit,
          market: defaultData.market,
          state: defaultData.state
        };
      }
      
      const record = fallbackData.records[0] as MarketRecord;
      return {
        current: parseFloat(record.modal_price),
        unit: record.price_unit || 'per quintal',
        market: record.market || initialMarketPriceData[crop].market,
        state: record.state || 'Tamil Nadu'
      };
    }
    
    // Find the most appropriate market from Tamil Nadu (prefer major markets)
    const preferredMarkets = [
      'Thanjavur', 'Chennai', 'Coimbatore', 'Madurai', 'Salem', 
      'Trichy', 'Erode', 'Tirunelveli', 'Dindigul', 'Villupuram'
    ];
    
    let bestRecord = data.records[0] as MarketRecord; // Default to first record
    
    // Try to find a record from a preferred market
    for (const market of preferredMarkets) {
      const match = data.records.find((r: MarketRecord) => r.market.includes(market));
      if (match) {
        bestRecord = match;
        break;
      }
    }
    
    return {
      current: parseFloat(bestRecord.modal_price),
      unit: bestRecord.price_unit || 'per quintal',
      market: bestRecord.market,
      state: bestRecord.state
    };
  } catch (error) {
    console.error('Error fetching prices for', crop, error);
    
    // Return default values from initialMarketPriceData if API call fails
    const defaultData = initialMarketPriceData[crop];
    return {
      current: defaultData.current,
      unit: defaultData.unit,
      market: defaultData.market,
      state: defaultData.state
    };
  }
};

// Add TypeScript interfaces for better type safety
interface CropPrice {
  current: number;
  history: number[];
  trend: 'up' | 'down' | 'stable';
  unit: string;
  market: string;
  state: string;
}

interface MarketPriceData {
  [key: string]: CropPrice;
}

// Update initial data to use proper type for 'trend'
const initialMarketPriceData: MarketPriceData = {
  Rice: {
    current: 2100,
    history: [2050, 2080, 2120, 2100],
    trend: 'stable',
    unit: 'per quintal',
    market: 'Thanjavur APMC',
    state: 'Tamil Nadu'
  },
  Groundnut: {
    current: 6500,
    history: [6200, 6300, 6400, 6500],
    trend: 'up',
    unit: 'per quintal',
    market: 'Salem APMC',
    state: 'Tamil Nadu'
  },
  Turmeric: {
    current: 7200,
    history: [7500, 7400, 7300, 7200],
    trend: 'down',
    unit: 'per quintal',
    market: 'Erode APMC',
    state: 'Tamil Nadu'
  },
  Coconut: {
    current: 2800,
    history: [2700, 2750, 2800, 2800],
    trend: 'stable',
    unit: 'per 100 nuts',
    market: 'Coimbatore APMC',
    state: 'Tamil Nadu'
  },
  Banana: {
    current: 2400,
    history: [2200, 2300, 2350, 2400],
    trend: 'up',
    unit: 'per quintal',
    market: 'Trichy APMC',
    state: 'Tamil Nadu'
  },
  "Black Gram": {
    current: 8500,
    history: [8700, 8600, 8550, 8500],
    trend: 'down',
    unit: 'per quintal',
    market: 'Madurai APMC',
    state: 'Tamil Nadu'
  },
  Sugarcane: {
    current: 320,
    history: [310, 315, 325, 320],
    trend: 'stable',
    unit: 'per quintal',
    market: 'Villupuram APMC',
    state: 'Tamil Nadu'
  },
  Cotton: {
    current: 6800,
    history: [6700, 6750, 6800, 6800],
    trend: 'stable',
    unit: 'per quintal',
    market: 'Tirunelveli APMC',
    state: 'Tamil Nadu'
  },
  Chillies: {
    current: 12500,
    history: [11800, 12000, 12300, 12500],
    trend: 'up',
    unit: 'per quintal',
    market: 'Dindigul APMC',
    state: 'Tamil Nadu'
  },
  Ragi: {
    current: 3300,
    history: [3400, 3350, 3320, 3300],
    trend: 'down',
    unit: 'per quintal',
    market: 'Dharmapuri APMC',
    state: 'Tamil Nadu'
  }
};

function MarketPrices() {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');
  const [isLoading, setIsLoading] = useState(false);
  const [marketPriceData, setMarketPriceData] = useState<MarketPriceData>(initialMarketPriceData);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Get the translated crop names
  const getTranslatedCropName = (cropKey: string): string => {
    const cropTranslationKey = `crop.${cropKey.toLowerCase().replace(/\s+/g, '')}`;
    return t(cropTranslationKey);
  };

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const newData = {...marketPriceData};
        
        for (const crop of Object.keys(newData)) {
          try {
            const priceData = await fetchMarketPrices(crop);
            const newPrice = priceData.current;
            const prevPrice = newData[crop].current;
            
            // Only update history for the selected crop to maintain separate histories
            const shouldUpdateHistory = crop === selectedCrop;
            
            newData[crop] = {
              ...newData[crop],
              current: newPrice,
              history: shouldUpdateHistory 
                ? [...newData[crop].history.slice(-4), newPrice]
                : newData[crop].history,
              trend: newPrice > prevPrice ? 'up' : 
                    newPrice < prevPrice ? 'down' : 'stable',
              unit: 'per quintal',
              market: priceData.market,
              state: priceData.state
            };
          } catch (error) {
            console.error(`Error fetching ${crop} prices:`, error);
            // Keep existing data if fetch fails
          }
        }
        
        setMarketPriceData(newData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to update market prices', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Fetch immediately when component mounts
    fetchPrices();
    
    // Update prices every hour
    const priceUpdateInterval = setInterval(fetchPrices, 60 * 60 * 1000);
    
    return () => clearInterval(priceUpdateInterval);
  }, []);
  
  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const newData = {...marketPriceData};
        
        for (const crop of Object.keys(newData)) {
          try {
            const priceData = await fetchMarketPrices(crop);
            const newPrice = priceData.current;
            const prevPrice = newData[crop].current;
            
            newData[crop] = {
              ...newData[crop],
              current: newPrice,
              history: [...newData[crop].history.slice(-4), newPrice],
              trend: newPrice > prevPrice ? 'up' : 
                    newPrice < prevPrice ? 'down' : 'stable',
              unit: 'per quintal',
              market: priceData.market,
              state: priceData.state
            };
          } catch (error) {
            console.error(`Error fetching ${crop} prices:`, error);
          }
        }
        
        setMarketPriceData(newData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to update market prices', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrices();
  }, [selectedCrop]);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const priceData = await fetchMarketPrices(selectedCrop);
        const newPrice = priceData.current;
        const prevPrice = marketPriceData[selectedCrop].current;
        
        setMarketPriceData(prev => ({
          ...prev,
          [selectedCrop]: {
            ...prev[selectedCrop],
            current: newPrice,
            history: [...prev[selectedCrop].history.slice(-4), newPrice],
            trend: newPrice > prevPrice ? 'up' : 
                  newPrice < prevPrice ? 'down' : 'stable',
            unit: priceData.unit,
            market: priceData.market,
            state: priceData.state
          }
        }));
        setLastUpdated(new Date());
      } catch (error) {
        console.error(`Error fetching ${selectedCrop} prices:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (selectedCrop) {
      fetchPrices();
    }
  }, [selectedCrop]);

  const cropOptions = Object.keys(marketPriceData).map(crop => ({
    value: crop,
    label: getTranslatedCropName(crop)
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
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center space-x-2 mb-8">
        <LineChart className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('market.title')}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('market.selectCrop')}
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">{t('market.currentPrice')}</h2>
              <button 
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const newData = {...marketPriceData};
                    
                    for (const crop of Object.keys(newData)) {
                      try {
                        const priceData = await fetchMarketPrices(crop);
                        const newPrice = priceData.current;
                        const prevPrice = newData[crop].current;
                        
                        newData[crop] = {
                          ...newData[crop],
                          current: newPrice,
                          history: [...newData[crop].history.slice(-4), newPrice],
                          trend: newPrice > prevPrice ? 'up' : 
                                newPrice < prevPrice ? 'down' : 'stable',
                          unit: priceData.unit,
                          market: priceData.market,
                          state: priceData.state
                        };
                      } catch (error) {
                        console.error(`Error refreshing ${crop} prices:`, error);
                        // Keep existing data if fetch fails
                      }
                    }
                    
                    setMarketPriceData(newData);
                    setLastUpdated(new Date());
                  } catch (error) {
                    console.error('Failed to refresh prices', error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                disabled={isLoading}
              >
                {t('market.refresh')}
              </button>
            </div>
            {isLoading ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl md:text-3xl font-bold">₹{marketPriceData[selectedCrop].current}</span>
                  <span className="text-gray-600">{marketPriceData[selectedCrop].unit}</span>
                  {getTrendIcon(marketPriceData[selectedCrop].trend)}
                </div>
                {marketPriceData[selectedCrop].market && (
                  <div className="flex flex-col mt-1">
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500">
                        {marketPriceData[selectedCrop].market}, {marketPriceData[selectedCrop].state}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {t('market.lastUpdated')}: {lastUpdated?.toLocaleTimeString() || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{t('market.dataSource')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t('market.insights')}</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                <span>{t('market.priceIs')} {t(`market.price.${marketPriceData[selectedCrop].trend}`)}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span>{t('market.bestTime')} {marketPriceData[selectedCrop].trend === 'up' 
                  ? t('market.sell.now') 
                  : marketPriceData[selectedCrop].trend === 'down' 
                  ? t('market.sell.wait') 
                  : t('market.sell.soon')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                <span>{t('market.location')} {marketPriceData[selectedCrop].market || 'Local market'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">{t('market.priceHistory')}</h2>
          {isLoading ? (
            <div className="animate-pulse h-48 flex items-end space-x-2">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="bg-gray-300 rounded-t w-full" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
              ))}
            </div>
          ) : (
            <div className="h-auto min-h-[200px] w-full overflow-x-auto">
              <div className="h-48 flex flex-col w-full min-w-[340px]">
                <div className="flex-1 flex items-end justify-around px-2" style={{ minHeight: "150px" }}>
                  {[...marketPriceData[selectedCrop].history, marketPriceData[selectedCrop].current].map((price, index) => {
                    const maxPrice = Math.max(...[...marketPriceData[selectedCrop].history, marketPriceData[selectedCrop].current]);
                    const minPrice = Math.min(...[...marketPriceData[selectedCrop].history, marketPriceData[selectedCrop].current]);
                    
                    // Calculate height with better scaling - if the values are close together, 
                    // the bars should still have visible differences
                    let percentage;
                    if (maxPrice === minPrice) {
                      percentage = 0.8; // 80% height if all values are the same
                    } else {
                      percentage = 0.3 + ((price - minPrice) / (maxPrice - minPrice) * 0.5);
                    }
                    
                    const heightPx = Math.floor(percentage * 150);
                    
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center px-1"
                      >
                        <div className="text-xs text-center bg-gray-800 text-white px-2 py-1 rounded font-medium mb-1 max-w-full truncate">
                          ₹{price}
                        </div>
                        <div 
                          className={`${price > marketPriceData[selectedCrop].current ? 'bg-red-600' : price < marketPriceData[selectedCrop].current ? 'bg-green-600' : 'bg-blue-600'} rounded-t w-full max-w-[50px]`}
                          style={{
                            height: `${heightPx}px`,
                            display: "block"
                          }}
                        />
                        <div className="text-xs text-gray-500 mt-2 truncate max-w-full text-center">
                          {index === marketPriceData[selectedCrop].history.length ? t('market.now') : `${t('market.day')} ${index+1}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-between mt-6 px-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
              <span className="text-xs text-gray-600">{t('market.lowerThan')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
              <span className="text-xs text-gray-600">{t('market.currentIs')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
              <span className="text-xs text-gray-600">{t('market.higherThan')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPrices;