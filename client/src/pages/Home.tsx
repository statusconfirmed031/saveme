import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZHJhc2h5IiwiYSI6ImNtNW0xMDR5eDF0c3cyanM2eHNhcmgza2oifQ.ir2qGmW_HQXEZHyQ9VQZLw';

const CITIES = [
  { name: 'San Francisco', lng: -122.4194, lat: 37.7749 },
  { name: 'New York', lng: -74.0060, lat: 40.7128 },
  { name: 'London', lng: -0.1278, lat: 51.5074 },
  { name: 'Tokyo', lng: 139.6917, lat: 35.6895 },
  { name: 'Sydney', lng: 151.2093, lat: -33.8688 },
];

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0060, 40.7128],
      zoom: 3,
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleCityClick = (city: typeof CITIES[0]) => {
    if (!map.current) return;
    setSelectedCity(city.name);
    map.current.flyTo({
      center: [city.lng, city.lat],
      zoom: 12,
      duration: 1500,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Cities</h1>
        <div className="space-y-2">
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityClick(city)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                selectedCity === city.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
      <div ref={mapContainer} className="flex-1" />
    </div>
  );
}
