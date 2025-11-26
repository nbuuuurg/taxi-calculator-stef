import React from 'react';
import { calculateFare } from '../utils/pricing';
import { Euro, Moon, Sun, AlertCircle } from 'lucide-react';
import { TarifType } from '../types';

interface PriceEstimatorProps {
  distanceKm: number;
  date: Date;
  isRoundTrip: boolean;
}

const PriceEstimator: React.FC<PriceEstimatorProps> = ({ distanceKm, date, isRoundTrip }) => {
  const estimate = calculateFare(distanceKm, date, isRoundTrip);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="bg-slate-900 p-6 text-white">
        <h3 className="text-lg font-medium opacity-90">Estimation du trajet</h3>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-taxi-yellow">{estimate.total.toFixed(2)} €</span>
          <span className="text-sm opacity-75">TTC (approx.)</span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1">
        {/* Detail Rows */}
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-500 text-sm">Distance</span>
          <span className="font-semibold text-slate-800">{estimate.distanceKm.toFixed(2)} km</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-500 text-sm">Prise en charge</span>
          <span className="font-semibold text-slate-800">{estimate.baseFare.toFixed(2)} €</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <div className="flex flex-col">
              <span className="text-slate-500 text-sm">Tarif appliqué</span>
              <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                {estimate.isNightOrSunday ? <Moon size={12}/> : <Sun size={12}/>}
                {estimate.details.name} ({estimate.details.pricePerKm} €/km)
              </span>
            </div>
            <span className="font-semibold text-slate-800">{estimate.distanceFare.toFixed(2)} €</span>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
           <div className="flex gap-2 mb-1">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span className="font-semibold">Note d'information</span>
           </div>
           <p className="opacity-90 leading-relaxed text-xs">
             Ce tarif est une estimation basée sur la réglementation française. 
             Le prix final au compteur peut varier selon les conditions de circulation, 
             les temps d'attente et les suppléments éventuels (bagages, 4ème passager, etc.).
           </p>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100">
         <button 
           className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
           onClick={() => alert(`Réservation simulée pour ${estimate.total} €`)}
         >
           Réserver ce trajet
         </button>
      </div>
    </div>
  );
};

export default PriceEstimator;
