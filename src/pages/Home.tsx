import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, User, FileCheck, Calendar, LineChart } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 px-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400 leading-tight pb-1">
          Welcome to AgriGuide
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Your complete farming companion - schemes, weather, crops, and market prices
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 px-4">
        <div 
          className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-100 group cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <User className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Create Profile</h2>
          <p className="text-sm text-gray-500 mb-3">Set up your farmer profile</p>
          <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-green-300 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div 
          className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-100 group cursor-pointer"
          onClick={() => navigate('/schemes')}
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <FileCheck className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Find Schemes</h2>
          <p className="text-sm text-gray-500 mb-3">Match with government schemes</p>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div 
          className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-yellow-100 group cursor-pointer"
          onClick={() => navigate('/crop-calendar')}
        >
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Crop Calendar</h2>
          <p className="text-sm text-gray-500 mb-3">Plan your farming activities</p>
          <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div 
          className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-purple-100 group cursor-pointer"
          onClick={() => navigate('/market-prices')}
        >
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <LineChart className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Market Prices</h2>
          <p className="text-sm text-gray-500 mb-3">Current crop prices</p>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="text-center px-4 py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-inner mb-8">
        <button
          onClick={() => navigate('/profile')}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
        >
          <Sprout className="mr-2 h-5 w-5" />
          Get Started
        </button>
        <p className="mt-6 text-sm text-gray-600">Access all farming resources in one place</p>
      </div>
    </div>
  );
}

export default Home;