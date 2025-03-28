import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, Home, User, FileCheck, Calendar, LineChart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile } from '../store/farmerSlice';
import type { RootState } from '../store';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.farmer.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-green-50';
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/profile', name: 'Profile' },
    { path: '/schemes', name: 'Schemes' },
    { path: '/crop-calendar', name: 'Crop Calendar' },
    { path: '/market-prices', name: 'Market Prices' },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-green-600 flex items-center hover:text-green-700 transition-colors">
                <Leaf className="h-7 w-7 mr-2" />
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">AgriGuide</span>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
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
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(link.path)} hover:scale-105 hover:shadow-sm space-x-1.5`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            {profile && (
              <button
                onClick={() => {
                  dispatch(clearProfile());
                  navigate('/');
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md mr-4"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-b-xl animate-fade-in">
          <div className="pt-4 pb-6 space-y-2 px-4">
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
                  className={`flex items-center px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-300 ${isActive(link.path)} hover:scale-[1.02] hover:shadow-sm space-x-2.5`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-6 w-6 mr-3" />
                  {link.name}
                </Link>
              );
            })}
            {profile && (
              <button
                onClick={() => {
                  dispatch(clearProfile());
                  navigate('/');
                  setIsOpen(false);
                }}
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 mt-4 shadow-inner"
              >
                <LogOut className="h-6 w-6 mr-3" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar