import React from 'react';
import { Calendar, Clock, MapPin, Navigation2, Repeat, ArrowRight } from 'lucide-react';
import { formatDateForInput } from '../utils/pricing';

interface BookingFormProps {
  origin: string;
  setOrigin: (val: string) => void;
  destination: string;
  setDestination: (val: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  isRoundTrip: boolean;
  setIsRoundTrip: (val: boolean) => void;
  manualDistance: number;
  setManualDistance: (val: number) => void;
  useManualDistance: boolean;
  setUseManualDistance: (val: boolean) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  date,
  setDate,
  isRoundTrip,
  setIsRoundTrip,
  manualDistance,
  setManualDistance,
  useManualDistance,
  setUseManualDistance
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="bg-taxi-yellow text-taxi-black p-1 rounded">TAXI</span>
        <span>RESA</span>
      </h2>

      <div className="space-y-4">
        {/* Origin */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Départ</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Adresse de départ..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Destination */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Arrivée</label>
          <div className="relative">
            <Navigation2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Adresse d'arrivée..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date & Heure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="datetime-local"
              value={formatDateForInput(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none"
            />
          </div>
        </div>

        {/* Trip Type Toggle */}
        <div className="flex items-center gap-4 py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isRoundTrip ? 'border-amber-500' : 'border-slate-300'}`}>
              {!isRoundTrip && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
            </div>
            <input
              type="radio"
              checked={!isRoundTrip}
              onChange={() => setIsRoundTrip(false)}
              className="hidden"
            />
            <span className={`text-sm font-medium ${!isRoundTrip ? 'text-slate-900' : 'text-slate-500'}`}>Aller Simple</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isRoundTrip ? 'border-amber-500' : 'border-slate-300'}`}>
              {isRoundTrip && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
            </div>
            <input
              type="radio"
              checked={isRoundTrip}
              onChange={() => setIsRoundTrip(true)}
              className="hidden"
            />
            <span className={`text-sm font-medium ${isRoundTrip ? 'text-slate-900' : 'text-slate-500'}`}>Aller / Retour</span>
          </label>
        </div>

        {/* Manual Distance Override */}
        <div className="pt-2 border-t border-slate-100">
           <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-400">Calcul automatique impossible ?</label>
              <button 
                onClick={() => setUseManualDistance(!useManualDistance)}
                className="text-xs text-amber-600 hover:text-amber-700 underline font-medium"
              >
                {useManualDistance ? 'Utiliser la carte' : 'Saisir distance manuelle'}
              </button>
           </div>
           
           {useManualDistance && (
             <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">km</span>
                <input 
                  type="number" 
                  min="0"
                  step="0.1"
                  value={manualDistance}
                  onChange={(e) => setManualDistance(parseFloat(e.target.value) || 0)}
                  className="w-full pl-4 pr-10 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-amber-900 font-medium"
                />
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default BookingForm;
