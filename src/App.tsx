import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadProfile } from './store/farmerSlice';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Schemes from './pages/Schemes';
import WeatherWidget from './components/WeatherWidget';
import CropCalendar from './pages/CropCalendar';
import MarketPrices from './pages/MarketPrices';
import DocumentMeta from './components/DocumentMeta';

function App() {
  useEffect(() => {
    store.dispatch(loadProfile());
  }, []);

  return (
    <Provider store={store}>
      <LanguageProvider>
        <DocumentMeta />
        <Router>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <main className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 animate-fade-in">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/crop-calendar" element={<CropCalendar />} />
                <Route path="/market-prices" element={<MarketPrices />} />
              </Routes>
            </main>
            <WeatherWidget />
          </div>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;