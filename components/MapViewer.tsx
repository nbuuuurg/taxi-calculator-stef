import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

interface MapViewerProps {
  origin: string;
  destination: string;
  onDistanceCalculated: (km: number) => void;
  className?: string;
}

// Global declaration for Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const MapViewer: React.FC<MapViewerProps> = ({
  origin,
  destination,
  onDistanceCalculated,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const directionsRenderer = useRef<any>(null);
  const directionsService = useRef<any>(null);
  const mapInstance = useRef<any>(null);

  // Fix: Cast import.meta to any to avoid Property 'env' does not exist on type 'ImportMeta' error
  // Use optional chaining to avoid crash if env is undefined
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;

  // Load Google Maps Script
  useEffect(() => {
    if (!apiKey) {
      setMapError("Clé API Google Maps manquante.");
      return;
    }

    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      // Script already loading
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setMapError("Erreur de chargement de Google Maps.");
    document.head.appendChild(script);

    return () => {
      // Cleanup not really possible/necessary for global script
    };
  }, [apiKey]);

  // Initialize Map
  useEffect(() => {
    if (isLoaded && !mapInstance.current && mapRef.current) {
      try {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          zoom: 5,
          center: { lat: 46.603354, lng: 1.888334 }, // Center of France
          disableDefaultUI: true,
          zoomControl: true,
        });
        directionsService.current = new window.google.maps.DirectionsService();
        directionsRenderer.current = new window.google.maps.DirectionsRenderer();
        directionsRenderer.current.setMap(mapInstance.current);
      } catch (e) {
        console.error("Map initialization error", e);
        setMapError("Erreur d'initialisation de la carte.");
      }
    }
  }, [isLoaded]);

  // Calculate Route
  useEffect(() => {
    if (isLoaded && directionsService.current && directionsRenderer.current && origin && destination) {
      // Only attempt if both fields have some content
      if (origin.length < 3 || destination.length < 3) return;

      directionsService.current.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: any, status: any) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.current.setDirections(result);
            const route = result.routes[0];
            if (route && route.legs && route.legs[0]) {
              const distanceMeters = route.legs[0].distance.value;
              const distanceKm = distanceMeters / 1000;
              onDistanceCalculated(distanceKm);
              setMapError(null);
            }
          } else {
            console.warn("Directions request failed due to " + status);
            // Don't show error immediately as user might be typing
          }
        }
      );
    }
  }, [isLoaded, origin, destination, onDistanceCalculated]);

  if (!apiKey || mapError) {
    return (
      <div className={`bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-6 text-slate-500 ${className}`}>
        <AlertTriangle className="w-10 h-10 mb-2 text-amber-500" />
        <p className="font-medium text-center">Carte indisponible</p>
        <p className="text-sm text-center mt-1">
          {mapError || "Configuration API manquante. Veuillez saisir la distance manuellement."}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-slate-200 ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 z-10">
          <div className="flex flex-col items-center">
            <Navigation className="w-8 h-8 animate-bounce text-slate-400" />
            <span className="text-slate-500 text-sm font-medium mt-2">Chargement de la carte...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapViewer;