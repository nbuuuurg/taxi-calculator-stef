import { TarifType, TARIFS, BASE_FARE, PriceEstimate } from '../types';

export const isNightOrSunday = (date: Date): boolean => {
  const day = date.getDay(); // 0 is Sunday
  const hour = date.getHours();

  const isSunday = day === 0;
  // Night is defined as 19:00 to 07:59 in the prompt (strictly 19h01-07h59 usually means after 7pm before 8am)
  // We'll use 19 <= hour or hour < 8
  const isNight = hour >= 19 || hour < 8;

  return isSunday || isNight;
};

export const determineTarif = (date: Date, isRoundTrip: boolean): TarifType => {
  const nightOrSun = isNightOrSunday(date);

  if (isRoundTrip) {
    // Aller/Retour
    return nightOrSun ? TarifType.B : TarifType.A;
  } else {
    // Aller Simple
    return nightOrSun ? TarifType.D : TarifType.C;
  }
};

export const calculateFare = (
  distanceKm: number,
  date: Date,
  isRoundTrip: boolean
): PriceEstimate => {
  const tarifType = determineTarif(date, isRoundTrip);
  const rule = TARIFS[tarifType];

  let distanceFare = distanceKm * rule.pricePerKm;
  let total = BASE_FARE + distanceFare;
  let finalBaseFare = BASE_FARE;

  if (isRoundTrip) {
    // "le prix affiché soit multiplié par deux"
    // On multiplie le total par 2
    total *= 2;
    // On ajuste les composants pour que l'addition reste cohérente (Base + Distance = Total)
    distanceFare *= 2;
  }

  return {
    total: parseFloat(total.toFixed(2)),
    baseFare: parseFloat(finalBaseFare.toFixed(2)),
    distanceFare: parseFloat(distanceFare.toFixed(2)),
    distanceKm: parseFloat(distanceKm.toFixed(2)),
    appliedTarif: tarifType,
    details: rule,
    isNightOrSunday: isNightOrSunday(date),
  };
};

export const formatDateForInput = (date: Date): string => {
  // Format Date to YYYY-MM-DDTHH:mm for datetime-local input
  const pad = (n: number) => (n < 10 ? '0' + n : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};