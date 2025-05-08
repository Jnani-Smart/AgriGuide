import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ta';

// Define translation context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Define translation record type
type TranslationRecord = Record<string, string>;

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Define props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// English translations
const en: TranslationRecord = {
  // Common
  'app.title': 'AgriGuide - Farmer Assistance Portal',
  'language.english': 'English',
  'language.tamil': 'Tamil',
  
  // Navigation
  'nav.home': 'Home',
  'nav.profile': 'Profile',
  'nav.schemes': 'Schemes',
  'nav.calendar': 'Crop Calendar',
  'nav.prices': 'Market Prices',
  'nav.logout': 'Logout',
  'nav.openMenu': 'Open main menu',
  
  // Home
  'home.welcome': 'Welcome to AgriGuide',
  'home.subtitle': 'Your complete farming companion - schemes, weather, crops, and market prices',
  'home.profile': 'Create Profile',
  'home.profile.desc': 'Set up your farmer profile',
  'home.schemes': 'Find Schemes',
  'home.schemes.desc': 'Match with government schemes',
  'home.calendar': 'Crop Calendar',
  'home.calendar.desc': 'Plan your farming activities',
  'home.prices': 'Market Prices',
  'home.prices.desc': 'Current crop prices',
  'home.getStarted': 'Get Started',
  'home.access': 'Access all farming resources in one place',
  
  // Profile
  'profile.title': 'Farmer Profile',
  'profile.subtitle': 'Complete your profile to get personalized recommendations and weather updates.',
  'profile.name': 'Full Name',
  'profile.age': 'Age',
  'profile.state': 'State',
  'profile.district': 'District',
  'profile.city': 'City',
  'profile.city.placeholder': 'Enter your city for accurate weather updates',
  'profile.landSize': 'Land Size (in acres)',
  'profile.income': 'Annual Income (in ₹)',
  'profile.annualIncome': 'Annual Income (in ₹)',
  'profile.crops': 'Crops',
  'profile.saveProfile': 'Save Profile',
  'profile.state.select': 'Select a state',
  
  // Market Prices
  'market.title': 'Market Prices',
  'market.selectCrop': 'Select Crop',
  'market.currentPrice': 'Current Price',
  'market.refresh': 'Refresh',
  'market.lastUpdated': 'Last updated',
  'market.dataSource': 'Data source: Agmarknet',
  'market.insights': 'Market Insights',
  'market.price.up': 'trending upward',
  'market.price.down': 'trending downward',
  'market.price.stable': 'stable',
  'market.sell.now': 'Now',
  'market.sell.wait': 'Wait for better prices',
  'market.sell.soon': 'Next 2-3 weeks',
  'market.priceIs': 'Current price is',
  'market.bestTime': 'Best time to sell:',
  'market.location': 'Market:',
  'market.priceHistory': 'Price History',
  'market.now': 'Now',
  'market.day': 'Day',
  'market.lowerThan': 'Lower than current',
  'market.currentIs': 'Current price',
  'market.higherThan': 'Higher than current',
  
  // Crops
  'crop.rice': 'Rice(Kuruvai)',
  'crop.samba': 'Rice(Samba)',
  'crop.groundnut': 'Groundnut',
  'crop.turmeric': 'Turmeric',
  'crop.coconut': 'Coconut',
  'crop.banana': 'Banana',
  'crop.blackGram': 'Black Gram',
  'crop.blackgram': 'Black Gram',
  'crop.sugarcane': 'Sugarcane',
  'crop.cotton': 'Cotton',
  'crop.chillies': 'Chillies',
  'crop.ragi': 'Ragi',
  'crop.wheat': 'Wheat',
  'crop.mustard': 'Mustard',
  'crop.gram': 'Gram',
  'crop.watermelon': 'Watermelon',
  'crop.muskmelon': 'Muskmelon',
  'crop.cucumber': 'Cucumber',
  
  // Schemes
  'schemes.title.all': 'All Available Schemes',
  'schemes.title.eligible': 'Eligible Schemes',
  'schemes.showEligible': 'Show eligible schemes only',
  'schemes.showAll': 'Show all schemes',
  'schemes.createProfile': 'Please create your profile first',
  'schemes.createProfileButton': 'Create Profile',
  'schemes.viewAll': 'Or view all available schemes',
  'schemes.noEligible': 'No eligible schemes found based on your profile.',
  'schemes.updateProfile': 'Update Profile',
  'schemes.benefits': 'Benefits',
  'schemes.documents': 'Required Documents',
  'schemes.howToApply': 'How to Apply',
  'schemes.applyNow': 'Apply Now',
  'schemes.eligibility': 'You are eligible because',
  'schemes.criteria.income': 'Annual Income less than',
  'schemes.criteria.minLand': 'Land size greater than',
  'schemes.criteria.maxLand': 'Land size less than',
  'schemes.criteria.minAge': 'Age greater than',
  'schemes.criteria.maxAge': 'Age less than',
  'schemes.criteria.state': 'Located in',
  'schemes.criteria.crops': 'Growing eligible crops',
  
  // Crop Calendar
  'calendar.title': 'Crop Calendar',
  'calendar.season': 'Season',
  'calendar.crop': 'Crop',
  'calendar.sowingTime': 'Sowing Time',
  'calendar.harvestTime': 'Harvest Time',
  'calendar.months': 'Months',
  
  // Season names
  'season.kharif': 'Kharif Season',
  'season.rabi': 'Rabi Season',
  'season.zaid': 'Zaid Season',
  
  // Weather Widget
  'weather.loading': 'Loading weather...',
  'weather.humidity': 'HUMIDITY',
  'weather.rainfall': 'RAINFALL',
  'weather.forecast': 'Forecast',
  'weather.error': 'Invalid city',
};

// Tamil translations
const ta: TranslationRecord = {
  // Common
  'app.title': 'உழவர் வழிகாட்டி - விவசாயி உதவி போர்டல்',
  'language.english': 'ஆங்கிலம்',
  'language.tamil': 'தமிழ்',
  
  // Navigation
  'nav.home': 'முகப்பு',
  'nav.profile': 'சுயவிவரம்',
  'nav.schemes': 'திட்டங்கள்',
  'nav.calendar': 'பயிர் காலண்டர்',
  'nav.prices': 'சந்தை விலைகள்',
  'nav.logout': 'வெளியேறு',
  'nav.openMenu': 'பிரதான மெனுவைத் திறக்கவும்',
  
  // Home
  'home.welcome': 'உழவர் வழிகாட்டிக்கு வரவேற்கிறோம்',
  'home.subtitle': 'உங்கள் முழுமையான விவசாய துணை - திட்டங்கள், வானிலை, பயிர்கள் மற்றும் சந்தை விலைகள்',
  'home.profile': 'சுயவிவரம் உருவாக்குக',
  'home.profile.desc': 'உங்கள் விவசாயி சுயவிவரத்தை அமைக்கவும்',
  'home.schemes': 'திட்டங்களைக் கண்டறிக',
  'home.schemes.desc': 'அரசு திட்டங்களுடன் பொருத்துக',
  'home.calendar': 'பயிர் காலண்டர்',
  'home.calendar.desc': 'உங்கள் விவசாய செயல்பாடுகளை திட்டமிடுங்கள்',
  'home.prices': 'சந்தை விலைகள்',
  'home.prices.desc': 'தற்போதைய பயிர் விலைகள்',
  'home.getStarted': 'தொடங்குங்கள்',
  'home.access': 'அனைத்து விவசாய வளங்களையும் ஒரே இடத்தில் அணுகவும்',
  
  // Profile
  'profile.title': 'விவசாயி சுயவிவரம்',
  'profile.subtitle': 'தனிப்பயனாக்கப்பட்ட பரிந்துரைகள் மற்றும் வானிலை புதுப்பிப்புகளைப் பெற உங்கள் சுயவிவரத்தை நிறைவு செய்யவும்.',
  'profile.name': 'முழு பெயர்',
  'profile.age': 'வயது',
  'profile.state': 'மாநிலம்',
  'profile.district': 'மாவட்டம்',
  'profile.city': 'நகரம்',
  'profile.city.placeholder': 'துல்லியமான வானிலை புதுப்பிப்புகளுக்கு உங்கள் நகரத்தை உள்ளிடவும்',
  'profile.landSize': 'நில அளவு (ஏக்கரில்)',
  'profile.income': 'ஆண்டு வருமானம் (₹ இல்)',
  'profile.annualIncome': 'ஆண்டு வருமானம் (₹ இல்)',
  'profile.crops': 'பயிர்கள்',
  'profile.saveProfile': 'சுயவிவரத்தை சேமிக்கவும்',
  'profile.state.select': 'ஒரு மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
  
  // Market Prices
  'market.title': 'சந்தை விலைகள்',
  'market.selectCrop': 'பயிரைத் தேர்ந்தெடுக்கவும்',
  'market.currentPrice': 'தற்போதைய விலை',
  'market.refresh': 'புதுப்பிக்கவும்',
  'market.lastUpdated': 'கடைசியாக புதுப்பிக்கப்பட்டது',
  'market.dataSource': 'தரவு மூலம்: Agmarknet',
  'market.insights': 'சந்தை நுண்ணறிவுகள்',
  'market.price.up': 'மேல் நோக்கி செல்கிறது',
  'market.price.down': 'கீழ் நோக்கி செல்கிறது',
  'market.price.stable': 'நிலையானது',
  'market.sell.now': 'இப்போது',
  'market.sell.wait': 'சிறந்த விலைகளுக்காக காத்திருக்கவும்',
  'market.sell.soon': 'அடுத்த 2-3 வாரங்களில்',
  'market.priceIs': 'தற்போதைய விலை',
  'market.bestTime': 'விற்பனைக்கு சிறந்த நேரம்:',
  'market.location': 'சந்தை:',
  'market.priceHistory': 'விலை வரலாறு',
  'market.now': 'இப்போது',
  'market.day': 'நாள்',
  'market.lowerThan': 'தற்போதையதை விட குறைவு',
  'market.currentIs': 'தற்போதைய விலை',
  'market.higherThan': 'தற்போதையதை விட அதிகம்',
  
  // Crops
  'crop.rice': 'குறுவை',
  'crop.samba': 'சம்பா',
  'crop.groundnut': 'நிலக்கடலை',
  'crop.turmeric': 'மஞ்சள்',
  'crop.coconut': 'தேங்காய்',
  'crop.banana': 'வாழைப்பழம்',
  'crop.blackGram': 'உளுந்து',
  'crop.blackgram': 'உளுந்து',
  'crop.sugarcane': 'கரும்பு',
  'crop.cotton': 'பருத்தி',
  'crop.chillies': 'மிளகாய்',
  'crop.ragi': 'கேழ்வரகு',
  'crop.wheat': 'கோதுமை',
  'crop.mustard': 'கடுகு',
  'crop.gram': 'கொண்டைக்கடலை',
  'crop.watermelon': 'தர்பூசணி',
  'crop.muskmelon': 'முலாம்பழம்',
  'crop.cucumber': 'வெள்ளரிக்காய்',
  
  // Schemes
  'schemes.title.all': 'அனைத்து கிடைக்கக்கூடிய திட்டங்கள்',
  'schemes.title.eligible': 'தகுதியான திட்டங்கள்',
  'schemes.showEligible': 'தகுதியான திட்டங்களை மட்டும் காட்டு',
  'schemes.showAll': 'அனைத்து திட்டங்களையும் காட்டு',
  'schemes.createProfile': 'முதலில் உங்கள் சுயவிவரத்தை உருவாக்கவும்',
  'schemes.createProfileButton': 'சுயவிவரம் உருவாக்குக',
  'schemes.viewAll': 'அல்லது அனைத்து கிடைக்கக்கூடிய திட்டங்களைக் காண்க',
  'schemes.noEligible': 'உங்கள் சுயவிவரத்தின் அடிப்படையில் எந்த தகுதியான திட்டங்களும் கிடைக்கவில்லை.',
  'schemes.updateProfile': 'சுயவிவரத்தைப் புதுப்பிக்கவும்',
  'schemes.benefits': 'நன்மைகள்',
  'schemes.documents': 'தேவையான ஆவணங்கள்',
  'schemes.howToApply': 'விண்ணப்பிப்பது எப்படி',
  'schemes.applyNow': 'இப்போது விண்ணப்பிக்கவும்',
  'schemes.eligibility': 'நீங்கள் தகுதியானவர் ஏனெனில்',
  'schemes.criteria.income': 'ஆண்டு வருமானம் குறைவாக உள்ளது',
  'schemes.criteria.minLand': 'நில அளவு அதிகமாக உள்ளது',
  'schemes.criteria.maxLand': 'நில அளவு குறைவாக உள்ளது',
  'schemes.criteria.minAge': 'வயது அதிகமாக உள்ளது',
  'schemes.criteria.maxAge': 'வயது குறைவாக உள்ளது',
  'schemes.criteria.state': 'அமைந்துள்ள இடம்',
  'schemes.criteria.crops': 'தகுதியான பயிர்களை வளர்ப்பது',
  
  // Crop Calendar
  'calendar.title': 'பயிர் காலண்டர்',
  'calendar.season': 'பருவம்',
  'calendar.crop': 'பயிர்',
  'calendar.sowingTime': 'விதைக்கும் நேரம்',
  'calendar.harvestTime': 'அறுவடை நேரம்',
  'calendar.months': 'மாதங்கள்',
  
  // Season names
  'season.kharif': 'காரிஃப் பருவம்',
  'season.rabi': 'ரபி பருவம்',
  'season.zaid': 'ஜாயிட் பருவம்',
  
  // Weather Widget
  'weather.loading': 'வானிலை ஏற்றுகிறது...',
  'weather.humidity': 'ஈரப்பதம்',
  'weather.rainfall': 'மழைப்பொழிவு',
  'weather.forecast': 'முன்கணிப்பு',
  'weather.error': 'தவறான நகரம்',
  
  // Tamil Nadu Specific Schemes
  'scheme.uzhavan-app': 'உழவன் செயலி திட்டம்',
  'scheme.cauvery-subsidy': 'காவிரி பாசன பாதுகாப்பு திட்டம்',
  'scheme.crop-insurance-tn': 'தமிழ்நாடு பயிர் காப்பீட்டு திட்டம்',
  
  // National Schemes
  'scheme.pmdisy': 'பிரதான் மந்திரி கிசான் சம்படா யோஜனா',
  'scheme.agri-infra-fund': 'விவசாய உள்கட்டமைப்பு நிதி',
  'scheme.animal-husbandry-infra': 'கால்நடை வளர்ப்பு உள்கட்டமைப்பு மேம்பாட்டு நிதி',
  'scheme.e-nam': 'மின்-தேசிய வேளாண் சந்தை',
  'scheme.fpo-scheme': 'விவசாயிகள் உற்பத்தியாளர் நிறுவனங்கள் உருவாக்கம்',
  'scheme.soil-health-card': 'மண் ஆரோக்கிய அட்டை திட்டம்',
};

// Create translations object with proper typing
const translations: Record<Language, TranslationRecord> = { en, ta };

// Translation function
const getTranslation = (language: Language, key: string): string => {
  const langData = translations[language];
  return langData[key] || key;
};

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get stored language or default to English
  const getInitialLanguage = (): Language => {
    const storedLanguage = localStorage.getItem('language');
    return (storedLanguage === 'en' || storedLanguage === 'ta') ? storedLanguage : 'en';
  };
  
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);