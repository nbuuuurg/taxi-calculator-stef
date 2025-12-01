export enum TarifType {
  A = 'A', // Jour, Aller/Retour
  B = 'B', // Nuit/Dimanche, Aller/Retour
  C = 'C', // Jour, Aller Simple
  D = 'D', // Nuit/Dimanche, Aller Simple
}

export interface PricingRule {
  name: string;
  pricePerKm: number;
  description: string;
  applicableCondition: string;
}

export interface TripDetails {
  origin: string;
  destination: string;
  distanceKm: number;
  pickupTime: Date;
  isRoundTrip: boolean; // True = Aller/Retour, False = Aller Simple
}

export interface PriceEstimate {
  total: number;
  baseFare: number;
  distanceFare: number;
  distanceKm: number;
  appliedTarif: TarifType;
  details: PricingRule;
  isNightOrSunday: boolean;
}

export const BASE_FARE = 2.60;

export const TARIFS: Record<TarifType, PricingRule> = {
  [TarifType.A]: {
    name: 'Tarif A',
    pricePerKm: 1.00,
    description: 'Jour, Aller/Retour (Lun-Sam)',
    applicableCondition: '08h-19h, Lun-Sam, Course avec retour',
  },
  [TarifType.B]: {
    name: 'Tarif B',
    pricePerKm: 1.50,
    description: 'Nuit/Dimanche, Aller/Retour',
    applicableCondition: '19h-08h ou Dimanche, Course avec retour',
  },
  [TarifType.C]: {
    name: 'Tarif C',
    pricePerKm: 2.00,
    description: 'Jour, Aller Simple (Lun-Sam)',
    applicableCondition: '08h-19h, Lun-Sam, Aller simple',
  },
  [TarifType.D]: {
    name: 'Tarif D',
    pricePerKm: 3.00,
    description: 'Nuit/Dimanche, Aller Simple',
    applicableCondition: '19h-08h ou Dimanche, Aller simple',
  },
};