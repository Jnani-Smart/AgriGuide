import { Calendar as CalendarIcon, Filter, User } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

// Define types for crop calendar data
interface Crop {
  name: string;
  sowingTime: string;
  harvestTime: string;
}

interface Season {
  season: string;
  months: string;
  crops: Crop[];
}

const cropCalendarData: Season[] = [
  {
    season: 'kharif',
    months: 'June-October',
    crops: [
      { name: 'rice', sowingTime: 'June-July', harvestTime: 'November-December' },
      { name: 'cotton', sowingTime: 'May-June', harvestTime: 'November-December' },
      { name: 'sugarcane', sowingTime: 'June-July', harvestTime: 'January-March' },
      { name: 'groundnut', sowingTime: 'June-July', harvestTime: 'October-November' },
      { name: 'turmeric', sowingTime: 'June-July', harvestTime: 'January-February' },
      { name: 'blackgram', sowingTime: 'July-August', harvestTime: 'October-November' },
      { name: 'chillies', sowingTime: 'June-July', harvestTime: 'November-December' },
      { name: 'ragi', sowingTime: 'July-August', harvestTime: 'October-November' }
    ]
  },
  {
    season: 'rabi',
    months: 'October-March',
    crops: [
      { name: 'wheat', sowingTime: 'October-November', harvestTime: 'March-April' },
      { name: 'mustard', sowingTime: 'September-October', harvestTime: 'February-March' },
      { name: 'gram', sowingTime: 'October-November', harvestTime: 'February-March' },
      { name: 'samba', sowingTime: 'August-October', harvestTime: 'January-February' }
    ]
  },
  {
    season: 'zaid',
    months: 'March-June',
    crops: [
      { name: 'watermelon', sowingTime: 'March', harvestTime: 'June' },
      { name: 'muskmelon', sowingTime: 'March', harvestTime: 'June' },
      { name: 'cucumber', sowingTime: 'March', harvestTime: 'June' }
    ]
  },
  {
    season: 'perennial',
    months: 'Year-round',
    crops: [
      { name: 'coconut', sowingTime: 'Year-round', harvestTime: 'Year-round (8-10 months after flowering)' },
      { name: 'banana', sowingTime: 'Year-round', harvestTime: 'Year-round (10-12 months after planting)' }
    ]
  }
];

function CropCalendar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const farmerProfile = useSelector((state: RootState) => state.farmer.profile);
  const [showOnlyUserCrops, setShowOnlyUserCrops] = useState(farmerProfile?.crops && farmerProfile.crops.length > 0);
  
  // Helper function to get translated crop name
  const getTranslatedCropName = (cropKey: string): string => {
    // Standardize crop key to match translation keys
    const standardizedKey = cropKey.toLowerCase().replace(/\s+/g, '');
    return t(`crop.${standardizedKey}`);
  };
  
  // Filter crops based on user selection
  const getFilteredCrops = (crops: Crop[]): Crop[] => {
    if (!showOnlyUserCrops || !farmerProfile?.crops || farmerProfile.crops.length === 0) {
      return crops;
    }
    
    return crops.filter(crop => 
      farmerProfile!.crops.some(userCrop => {
        // Convert both to lowercase for case-insensitive comparison
        const userCropLower = userCrop.toLowerCase();
        const calendarCropLower = crop.name.toLowerCase();
        
        // Direct match
        if (userCropLower === calendarCropLower) {
          return true;
        }
        
        // Remove spaces for comparison (e.g., 'Black Gram' vs 'blackgram')
        const userCropNoSpaces = userCropLower.replace(/\s+/g, '');
        if (userCropNoSpaces === calendarCropLower) {
          return true;
        }
        
        // Special case for 'rice' and 'samba' which are both types of rice
        if (userCropLower === 'rice' && calendarCropLower === 'samba') {
          return true;
        }
        if (userCropLower === 'samba' && calendarCropLower === 'rice') {
          return true;
        }
        
        return false;
      })
    );
  };
  
  // Navigate to profile if user wants to update their crops
  const handleGoToProfile = () => {
    navigate('/profile');
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('calendar.title')}</h1>
        </div>
        
        {farmerProfile ? (
          <div className="flex items-center">
            <label className="inline-flex items-center mr-4 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showOnlyUserCrops} 
                onChange={() => setShowOnlyUserCrops(!showOnlyUserCrops)}
                className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                {t('calendar.showMyCrops')}
              </span>
            </label>
            <button 
              onClick={handleGoToProfile}
              className="text-sm text-green-600 hover:text-green-800 flex items-center"
            >
              <User className="h-4 w-4 mr-1" />
              {t('calendar.updateCrops')}
            </button>
          </div>
        ) : (
          <button 
            onClick={handleGoToProfile}
            className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 flex items-center"
          >
            <User className="h-4 w-4 mr-1" />
            {t('profile.createProfileButton')}
          </button>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {cropCalendarData.map((season) => (
          <div key={season.season} className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{t(`season.${season.season}`)}</h2>
              <p className="text-sm md:text-base text-gray-600">{season.months}</p>
            </div>

            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('calendar.crop')}</th>
                      <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('calendar.sowingTime')}</th>
                      <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('calendar.harvestTime')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredCrops(season.crops).length > 0 ? (
                      getFilteredCrops(season.crops).map((crop) => (
                        <tr key={crop.name} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{getTranslatedCropName(crop.name)}</td>
                          <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{crop.sowingTime}</td>
                          <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{crop.harvestTime}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-3 sm:px-4 md:px-6 py-4 text-center text-sm text-gray-500">
                          {showOnlyUserCrops ? t('calendar.noSelectedCrops') : t('calendar.noCrops')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropCalendar;