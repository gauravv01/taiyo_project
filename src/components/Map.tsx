import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  data: Array<{
    country: string;
    countryInfo: { lat: number; long: number };
    active: number;
    recovered: number;
    deaths: number;
  }>;
}

const Map: React.FC<MapProps> = ({ data }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: rgba(255, 0, 0, 0.6); border-radius: 50%; width: 10px; height: 10px;"></div>`,
          })}
        >
          <Popup>
            <div>
              <h3>{country.country}</h3>
              <p>Active cases: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
