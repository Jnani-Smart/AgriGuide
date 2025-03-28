import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { setProfile } from '../store/farmerSlice';
import type { RootState } from '../store';
import type { Farmer } from '../types';
import { indianStates } from '../data/states';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProfile = useSelector((state: RootState) => state.farmer.profile);

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
    dispatch(setProfile({
      id: currentProfile?.id || crypto.randomUUID(),
      ...formData as Farmer
    }));
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

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
      <div className="flex items-center mb-6">
        <User className="h-8 w-8 text-green-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Farmer Profile</h1>
      </div>
      <p className="text-gray-600 mb-8">Complete your profile to get personalized recommendations and weather updates.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
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

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            min="18"
            max="120"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select a state</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
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

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            placeholder="Enter your city for accurate weather updates"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="landSize" className="block text-sm font-medium text-gray-700">Land Size (in acres)</label>
          <input
            type="number"
            id="landSize"
            name="landSize"
            value={formData.landSize}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">Annual Income (in ₹)</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {formData.annualIncome !== undefined && (
            <p className="mt-1 text-sm text-gray-500">₹ {formatNumberWithCommas(formData.annualIncome)}</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">Crops</span>
          <div className="space-y-2">
            {['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses'].map(crop => (
              <label key={crop} className="flex items-center">
                <input
                  type="checkbox"
                  value={crop}
                  checked={formData.crops?.includes(crop)}
                  onChange={handleCropChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">{crop}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <User className="h-5 w-5 mr-2" />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;