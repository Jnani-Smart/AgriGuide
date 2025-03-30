import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label={`Switch to ${language === 'en' ? 'Tamil' : 'English'}`}
    >
      <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
      <span className="ml-1 sm:ml-2 text-gray-700">
        {language === 'en' ? 'தமிழ்' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher; 