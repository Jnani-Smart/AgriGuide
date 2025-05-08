import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { setProfile } from '../store/farmerSlice';
import type { RootState } from '../store';
import type { Farmer } from '../types';
import { indianStates } from '../data/states';
import { useLanguage } from '../contexts/LanguageContext';

// Import all crops from crop calendar for consistency
const allCrops = [
  // Kharif crops
  'Rice', 'Cotton', 'Sugarcane', 'Groundnut', 'Turmeric', 'Blackgram', 'Chillies', 'Ragi',
  // Rabi crops
  'Wheat', 'Mustard', 'Gram', 'Samba',
  // Zaid crops
  'Watermelon', 'Muskmelon', 'Cucumber',
  // Perennial crops
  'Coconut', 'Banana'
];

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProfile = useSelector((state: RootState) => state.farmer.profile);
  const { t } = useLanguage();

  const [formData, setFormData] = useState<Partial<Farmer>>({
    name: '',
    age: undefined,
    state: '',
    district: '',
    city: '',
    landSize: undefined,
    crops: [],
    annualIncome: undefined,
  });

  useEffect(() => {
    if (currentProfile) {
      setFormData(currentProfile);
    }
  }, [currentProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      ...formData as Farmer
    };
    
    // Only generate a new ID if no profile exists yet
    if (!currentProfile?.id) {
      profileData.id = crypto.randomUUID();
    } else {
      profileData.id = currentProfile.id;
    }
    
    dispatch(setProfile(profileData));
    navigate('/schemes');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'landSize' || name === 'annualIncome' 
        ? Number(value) 
        : value
    }));
  };
  
  // Format number with commas
  const formatNumberWithCommas = (num: number | undefined): string => {
    if (num === undefined) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const crop = e.target.value;
    setFormData(prev => ({
      ...prev,
      crops: prev.crops?.includes(crop)
        ? prev.crops.filter(c => c !== crop)
        : [...(prev.crops || []), crop]
    }));
  };

  // Helper function to get translated crop name
  const getTranslatedCropName = (cropName: string): string => {
    // Standardize crop key to match translation keys
    const cropKey = cropName.toLowerCase().replace(/\s+/g, '');
    return t(`crop.${cropKey}`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
      <div className="flex items-center mb-4 sm:mb-6">
        <User className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2 sm:mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('profile.title')}</h1>
      </div>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">{t('profile.subtitle')}</p>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('profile.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.age')}
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age === 0 ? '' : formData.age}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            min="1"
            max="120"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">{t('profile.state')}</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">{t('profile.state.select')}</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">{t('profile.district')}</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">{t('profile.city')}</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            placeholder={t('profile.city.placeholder')}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.landSize')}
          </label>
          <input
            type="number"
            id="landSize"
            name="landSize"
            value={formData.landSize === 0 ? '' : formData.landSize}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            min="0.1"
            step="0.1"
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.income')}
          </label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome === 0 ? '' : formData.annualIncome}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            step="1000"
            required
          />
        </div>

        {formData.annualIncome !== undefined && (
          <p className="mt-1 text-sm text-gray-500">₹ {formatNumberWithCommas(formData.annualIncome)}</p>
        )}

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">{t('profile.crops')}</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allCrops.map(crop => (
              <label key={crop} className="flex items-center">
                <input
                  type="checkbox"
                  value={crop}
                  checked={formData.crops?.includes(crop)}
                  onChange={handleCropChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm">{getTranslatedCropName(crop)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 sm:pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <User className="h-5 w-5 mr-2" />
            {t('profile.saveProfile')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;