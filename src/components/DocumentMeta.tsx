import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DocumentMeta: React.FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Update the document title based on the selected language
    document.title = t('app.title');
    
    // Update the html lang attribute
    document.documentElement.setAttribute('lang', language);
  }, [language, t]);

  // This component doesn't render anything visible
  return null;
};

export default DocumentMeta; 