import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Check } from 'lucide-react';
import type { RootState } from '../store';
import { schemes } from '../data/schemes';
import { useLanguage } from '../contexts/LanguageContext';
import type { Farmer } from '../types';

// Add type definition for a scheme
interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  documents: string[];
  applicationProcess: string;
  websiteUrl: string;
  eligibilityCriteria: {
    maxAnnualIncome?: number;
    minLandSize?: number;
    maxLandSize?: number;
    minAge?: number;
    maxAge?: number;
    states?: string[];
    requiredCrops?: string[];
  }
}

function Schemes() {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.farmer.profile);
  const [showAllSchemes, setShowAllSchemes] = useState(false);
  const { t } = useLanguage();

  // Helper function to check which eligibility criteria match the profile
  const getMatchingCriteria = (scheme: Scheme, profile: Farmer) => {
    const criteria = scheme.eligibilityCriteria;
    const matches = {
      income: criteria.maxAnnualIncome && profile.annualIncome !== undefined && profile.annualIncome <= criteria.maxAnnualIncome,
      landSize: criteria.minLandSize && profile.landSize !== undefined && profile.landSize >= criteria.minLandSize,
      maxLandSize: criteria.maxLandSize && profile.landSize !== undefined && profile.landSize <= criteria.maxLandSize,
      age: criteria.minAge && profile.age !== undefined && profile.age >= criteria.minAge,
      maxAge: criteria.maxAge && profile.age !== undefined && profile.age <= criteria.maxAge,
      state: criteria.states && profile.state && criteria.states.includes(profile.state),
      crops: criteria.requiredCrops && profile.crops && profile.crops.some(crop => criteria.requiredCrops?.includes(crop))
    };
    
    return matches;
  };

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

  const SchemeCard = ({ scheme }: { scheme: Scheme }) => {
    const matches = profile ? getMatchingCriteria(scheme, profile) : null;
    const isEligible = !showAllSchemes || eligibleSchemes.some(s => s.id === scheme.id);

    return (
      <div key={scheme.id} className={`bg-white rounded-lg shadow-md p-6 ${isEligible ? 'border-l-4 border-green-500' : ''}`}>
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{scheme.name}</h2>
          <a
            href={scheme.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
          >
            {t('schemes.applyNow')} <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="text-gray-600 mb-4">{scheme.description}</p>
        
        {/* Show eligibility criteria if profile exists and we're in eligible schemes view */}
        {profile && !showAllSchemes && isEligible && (
          <div className="mb-4 bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('schemes.eligibility')}</h3>
            <ul className="space-y-1">
              {scheme.eligibilityCriteria.maxAnnualIncome && matches?.income && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.income')}: ₹{scheme.eligibilityCriteria.maxAnnualIncome.toLocaleString('en-IN')}
                </li>
              )}
              {scheme.eligibilityCriteria.minLandSize && matches?.landSize && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.minLand')}: {scheme.eligibilityCriteria.minLandSize} acres
                </li>
              )}
              {scheme.eligibilityCriteria.maxLandSize && matches?.maxLandSize && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.maxLand')}: {scheme.eligibilityCriteria.maxLandSize} acres
                </li>
              )}
              {scheme.eligibilityCriteria.minAge && matches?.age && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.minAge')}: {scheme.eligibilityCriteria.minAge} years
                </li>
              )}
              {scheme.eligibilityCriteria.maxAge && matches?.maxAge && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.maxAge')}: {scheme.eligibilityCriteria.maxAge} years
                </li>
              )}
              {scheme.eligibilityCriteria.states && matches?.state && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.state')}: {profile.state}
                </li>
              )}
              {scheme.eligibilityCriteria.requiredCrops && matches?.crops && (
                <li className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t('schemes.criteria.crops')}: {profile.crops?.filter(crop => 
                    scheme.eligibilityCriteria.requiredCrops?.includes(crop)
                  ).join(', ')}
                </li>
              )}
            </ul>
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('schemes.benefits')}</h3>
          <ul className="list-disc list-inside space-y-1">
            {scheme.benefits.map((benefit: string, index: number) => (
              <li key={index} className="text-gray-600">{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('schemes.documents')}</h3>
          <ul className="list-disc list-inside space-y-1">
            {scheme.documents.map((doc: string, index: number) => (
              <li key={index} className="text-gray-600">{doc}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('schemes.howToApply')}</h3>
          <p className="text-gray-600">{scheme.applicationProcess}</p>
        </div>
      </div>
    );
  };

  if (!profile && !showAllSchemes) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('schemes.createProfile')}</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/profile')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t('schemes.createProfileButton')}
          </button>
          <div>
            <button
              onClick={() => setShowAllSchemes(true)}
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              {t('schemes.viewAll')}
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
          {showAllSchemes ? t('schemes.title.all') : t('schemes.title.eligible')}
        </h1>
        <button
          onClick={() => setShowAllSchemes(!showAllSchemes)}
          className="text-green-600 hover:text-green-700 transition-colors"
        >
          {showAllSchemes ? t('schemes.showEligible') : t('schemes.showAll')}
        </button>
      </div>
      
      {displaySchemes.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">{t('schemes.noEligible')}</p>
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t('schemes.updateProfile')}
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