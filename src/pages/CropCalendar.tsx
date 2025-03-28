import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const cropCalendarData = [
  {
    season: 'Kharif',
    months: 'June-October',
    crops: [
      { name: 'Rice', sowingTime: 'June-July', harvestTime: 'November-December' },
      { name: 'Cotton', sowingTime: 'May-June', harvestTime: 'November-December' },
      { name: 'Sugarcane', sowingTime: 'June-July', harvestTime: 'January-March' }
    ]
  },
  {
    season: 'Rabi',
    months: 'October-March',
    crops: [
      { name: 'Wheat', sowingTime: 'October-November', harvestTime: 'March-April' },
      { name: 'Mustard', sowingTime: 'September-October', harvestTime: 'February-March' },
      { name: 'Gram', sowingTime: 'October-November', harvestTime: 'February-March' }
    ]
  },
  {
    season: 'Zaid',
    months: 'March-June',
    crops: [
      { name: 'Watermelon', sowingTime: 'March', harvestTime: 'June' },
      { name: 'Muskmelon', sowingTime: 'March', harvestTime: 'June' },
      { name: 'Cucumber', sowingTime: 'March', harvestTime: 'June' }
    ]
  }
];

function CropCalendar() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center space-x-2 mb-8">
        <CalendarIcon className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Crop Calendar</h1>
      </div>

      <div className="space-y-8">
        {cropCalendarData.map((season) => (
          <div key={season.season} className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{season.season} Season</h2>
              <p className="text-gray-600">{season.months}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sowing Time</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvest Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {season.crops.map((crop) => (
                    <tr key={crop.name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.name}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">{crop.sowingTime}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">{crop.harvestTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropCalendar;