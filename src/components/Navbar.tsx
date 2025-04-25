import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, Home, User, FileCheck, Calendar, LineChart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile } from '../store/farmerSlice';
import type { RootState } from '../store';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.farmer.profile);
  const { t } = useLanguage();
  const [showGreeting, setShowGreeting] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    // Add the event listener if the dropdown is open
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);
  
  // Get the first name only
  const getFirstName = (fullName: string) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-green-50';
  };
  
  const navLinks = [
    { path: '/', name: t('nav.home') },
    { path: '/profile', name: t('nav.profile') },
    { path: '/schemes', name: t('nav.schemes') },
    { path: '/crop-calendar', name: t('nav.calendar') },
    { path: '/market-prices', name: t('nav.prices') },
  ];
  
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 bg-green-600 text-white px-3 py-2 rounded z-50">Skip to main content</a>
      <nav aria-label="Main navigation" role="navigation" className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 w-full">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-green-600 flex items-center hover:text-green-700 transition-colors min-w-0">
              <Leaf className="h-6 w-6 sm:h-7 sm:w-7 mr-1 sm:mr-2" />
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent truncate-responsive">AgriGuide</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center justify-center flex-1 ml-6 mr-4 min-w-0">
            <div className="flex sm:space-x-2 md:space-x-4 lg:space-x-6">
              {navLinks.map(link => {
                let Icon;
                switch(link.path) {
                  case '/':
                    Icon = Home;
                    break;
                  case '/profile':
                    Icon = User;
                    break;
                  case '/schemes':
                    Icon = FileCheck;
                    break;
                  case '/crop-calendar':
                    Icon = Calendar;
                    break;
                  case '/market-prices':
                    Icon = LineChart;
                    break;
                  default:
                    Icon = Leaf;
                }
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center px-2 md:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(link.path)} hover:scale-105 hover:shadow-sm`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageSwitcher />
            {profile && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setShowGreeting(false); // Always hide greeting when toggling dropdown
                  }}
                  onMouseEnter={() => {
                    // Only show greeting if dropdown is closed
                    if (!isProfileOpen) {
                      setShowGreeting(true);
                    }
                  }}
                  onMouseLeave={() => {
                    setShowGreeting(false);
                  }}
                  className="inline-flex items-center justify-center h-9 sm:h-10 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-w-[40px] sm:min-w-[90px]"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-green-600" />
                  <span className="text-gray-700 text-xs sm:text-sm truncate-responsive max-w-[80px] sm:max-w-[120px]">
                    {getFirstName(profile.name)}
                  </span>
                </button>
                
                <div 
                  className={`absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 px-3 py-2 text-sm font-medium text-gray-700 whitespace-nowrap transition-all duration-150 ease-in-out transform origin-top-right ${
                    showGreeting ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                  }`}
                >
                  Hi, {profile.name}
                </div>
                
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-200 ease-out ${isProfileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        dispatch(clearProfile());
                        navigate('/');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 flex items-center transition-colors duration-150 group"
                    >
                      <LogOut className="h-4 w-4 mr-2 group-hover:text-red-600 transition-colors duration-150" />
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                className="inline-flex items-center justify-center p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 touch-target"
              >
                <span className="sr-only">{t('nav.openMenu')}</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-b-xl animate-fade-in" tabIndex={-1}>
          <div className="pt-2 pb-3 space-y-1 px-3">
            {navLinks.map(link => {
              let Icon;
              switch(link.path) {
                case '/':
                  Icon = Home;
                  break;
                case '/profile':
                  Icon = User;
                  break;
                case '/schemes':
                  Icon = FileCheck;
                  break;
                case '/crop-calendar':
                  Icon = Calendar;
                  break;
                case '/market-prices':
                  Icon = LineChart;
                  break;
                default:
                  Icon = Leaf;
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${isActive(link.path)} hover:scale-[1.02] hover:shadow-sm`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {link.name}
                </Link>
              );
            })}
            
          </div>
        </div>
      )}
    </nav>
      </>
  );
}

export default Navbar;