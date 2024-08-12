import React from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const fetchCountryData = async (): Promise<CountryData[]> => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  return response.json();
};

const Maps: React.FC = () => {
  const { data: countryData, isLoading } = useQuery<CountryData[]>('countryData', fetchCountryData);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">COVID-19 World Map</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg" style={{ height: '70vh' }}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData && countryData.map((country) => (
            <Marker 
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{country.country}</h3>
                  <p>Active Cases: {country.active.toLocaleString()}</p>
                  <p>Recovered Cases: {country.recovered.toLocaleString()}</p>
                  <p>Deaths: {country.deaths.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;