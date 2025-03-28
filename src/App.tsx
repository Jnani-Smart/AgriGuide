import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { loadProfile } from './store/farmerSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Schemes from './pages/Schemes';
import WeatherWidget from './components/WeatherWidget';
import CropCalendar from './pages/CropCalendar';
import MarketPrices from './pages/MarketPrices';

function App() {
  useEffect(() => {
    store.dispatch(loadProfile());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8 animate-fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/crop-calendar" element={<CropCalendar />} />
              <Route path="/market-prices" element={<MarketPrices />} />
            </Routes>
          </main>
          <WeatherWidget />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#38a169',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#e53e3e',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;