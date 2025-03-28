import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { RootState } from '../store';
import { schemes } from '../data/schemes';

function Schemes() {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.farmer.profile);
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  const eligibleSchemes = schemes.filter(scheme => {
    const criteria = scheme.eligibilityCriteria;
    
    // Validate profile exists and has required fields
    if (!profile) return false;
    
    // Check each eligibility criterion
    const incomeValid = !criteria.maxAnnualIncome || 
      (profile.annualIncome !== undefined && profile.annualIncome <= criteria.maxAnnualIncome);
    
    const landSizeValid = !criteria.minLandSize || 
      (profile.landSize !== undefined && profile.landSize >= criteria.minLandSize);
    
    const maxLandSizeValid = !criteria.maxLandSize || 
      (profile.landSize !== undefined && profile.landSize <= criteria.maxLandSize);
    
    const ageValid = !criteria.minAge || 
      (profile.age !== undefined && profile.age >= criteria.minAge);
    
    const maxAgeValid = !criteria.maxAge || 
      (profile.age !== undefined && profile.age <= criteria.maxAge);
    
    const stateValid = !criteria.states || 
      (profile.state && criteria.states.includes(profile.state));
    
    const cropsValid = !criteria.requiredCrops || 
      (profile.crops && profile.crops.some(crop => criteria.requiredCrops?.includes(crop)));
    
    return incomeValid && landSizeValid && maxLandSizeValid && 
           ageValid && maxAgeValid && stateValid && cropsValid;
  });

  const displaySchemes = showAllSchemes ? schemes : eligibleSchemes;

  const SchemeCard = ({ scheme }) => (
    <div key={scheme.id} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{scheme.name}</h2>
        <a
          href={scheme.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
        >
          Apply Now <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <p className="text-gray-600 mb-4">{scheme.description}</p>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
        <ul className="list-disc list-inside space-y-1">
          {scheme.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-600">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Required Documents</h3>
        <ul className="list-disc list-inside space-y-1">
          {scheme.documents.map((doc, index) => (
            <li key={index} className="text-gray-600">{doc}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">How to Apply</h3>
        <p className="text-gray-600">{scheme.applicationProcess}</p>
      </div>
    </div>
  );

  if (!profile && !showAllSchemes) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please create your profile first</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/profile')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Profile
          </button>
          <div>
            <button
              onClick={() => setShowAllSchemes(true)}
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              Or view all available schemes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {showAllSchemes ? 'All Available Schemes' : 'Eligible Schemes'}
        </h1>
        <button
          onClick={() => setShowAllSchemes(!showAllSchemes)}
          className="text-green-600 hover:text-green-700 transition-colors"
        >
          {showAllSchemes ? 'Show eligible schemes only' : 'Show all schemes'}
        </button>
      </div>
      
      {displaySchemes.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">No eligible schemes found based on your profile.</p>
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {displaySchemes.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Schemes;