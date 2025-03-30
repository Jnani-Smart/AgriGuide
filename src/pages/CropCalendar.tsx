import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const cropCalendarData = [
  {
    season: 'kharif',
    months: 'June-October',
    crops: [
      { name: 'rice', sowingTime: 'June-July', harvestTime: 'November-December' },
      { name: 'cotton', sowingTime: 'May-June', harvestTime: 'November-December' },
      { name: 'sugarcane', sowingTime: 'June-July', harvestTime: 'January-March' }
    ]
  },
  {
    season: 'rabi',
    months: 'October-March',
    crops: [
      { name: 'wheat', sowingTime: 'October-November', harvestTime: 'March-April' },
      { name: 'mustard', sowingTime: 'September-October', harvestTime: 'February-March' },
      { name: 'gram', sowingTime: 'October-November', harvestTime: 'February-March' }
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
  }
];

function CropCalendar() {
  const { t } = useLanguage();
  
  // Helper function to get translated crop name
  const getTranslatedCropName = (cropKey: string): string => {
    return t(`crop.${cropKey}`);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 mb-4 sm:mb-6 md:mb-8">
        <CalendarIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('calendar.title')}</h1>
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
                    {season.crops.map((crop) => (
                      <tr key={crop.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{getTranslatedCropName(crop.name)}</td>
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{crop.sowingTime}</td>
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{crop.harvestTime}</td>
                      </tr>
                    ))}
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