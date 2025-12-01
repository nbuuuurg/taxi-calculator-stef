import React, { useState, useEffect } from 'react';
import BookingForm from './components/BookingForm';
import MapViewer from './components/MapViewer';
import PriceEstimator from './components/PriceEstimator';
import { Car, Phone, ArrowRight, ImageOff } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState(0);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Desktop/Tablet Logo Section */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 p-2 rounded-lg text-slate-900">
                <Car size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                Taxi<span className="text-amber-500">Resa</span>
              </h1>
            </div>
            
            {/* Arrow and Partner Logo */}
            <div className="flex items-center gap-3">
              <ArrowRight className="text-slate-300" size={24} />
              
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Le Taxi de Stef" 
                  className="h-12 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="h-12 flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 border-dashed rounded text-slate-400 text-xs">
                  <ImageOff size={16} />
                  <span>Logo introuvable (/public/logo.png)</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Header Content (Centered Phone) */}
          <div className="md:hidden w-full flex justify-center">
             <a href="tel:0749068665" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full shadow-md active:scale-95 transition-transform">
                <Phone size={18} />
                <span className="font-bold">07 49 06 86 65</span>
             </a>
          </div>

          {/* Desktop Navigation (Right Side) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="https://allotaxietampes.fr/" className="hover:text-amber-500 transition-colors">Services</a>
            <a href="https://allotaxietampes.fr/" className="hover:text-amber-500 transition-colors">Entreprises</a>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">
              <Phone size={16} />
              <span>07 49 06 86 65</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Form (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <BookingForm 
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
              date={date}
              setDate={setDate}
              isRoundTrip={isRoundTrip}
              setIsRoundTrip={setIsRoundTrip}
            />
            
            <div className="hidden lg:block bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-amber-900 mb-2">Pourquoi nous choisir ?</h4>
              <ul className="space-y-2 text-sm text-amber-800/80">
                <li className="flex items-center gap-2">✓ Chauffeurs certifiés</li>
                <li className="flex items-center gap-2">✓ Tarifs réglementés</li>
                <li className="flex items-center gap-2">✓ Disponibilité 24/7</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Map & Estimate (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Map Section - Flexible Height */}
            <div className="h-[300px] lg:h-[450px] w-full">
              <MapViewer 
                origin={origin}
                destination={destination}
                onDistanceCalculated={setCalculatedDistance}
                className="h-full shadow-lg border-2 border-white"
              />
            </div>

            {/* Estimate Section */}
            <div className="flex-1">
               {calculatedDistance > 0 ? (
                 <PriceEstimator 
                    origin={origin}
                    destination={destination}
                    distanceKm={calculatedDistance}
                    date={date}
                    isRoundTrip={isRoundTrip}
                 />
               ) : (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center text-slate-400">
                    <Car className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium text-slate-600">En attente de trajet...</p>
                    <p className="text-sm">Remplissez les adresses pour voir l'estimation.</p>
                 </div>
               )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Taxi Resa France. Tous droits réservés.</p>
          <p className="mt-2 text-xs">Application de démonstration respectant la réglementation tarifaire préfectorale en vigueur.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;