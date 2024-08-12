import React from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchWorldwideData, fetchCountryData, fetchHistoricalData } from '../services/api';
import { WorldwideData, CountryData, HistoricalData } from '../types';

const ChartsAndMaps: React.FC = () => {
  const { data: worldData, isLoading: isLoadingWorld, error: worldError } = useQuery<WorldwideData, Error>('worldData', fetchWorldwideData);
  const { data: countryData, isLoading: isLoadingCountry, error: countryError } = useQuery<CountryData[], Error>('countryData', fetchCountryData);
  const { data: historicalData, isLoading: isLoadingHistorical, error: historicalError } = useQuery<HistoricalData, Error>('historicalData', fetchHistoricalData);

  if (isLoadingWorld || isLoadingCountry || isLoadingHistorical) {
    return <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-700">Loading data...</div>;
  }

  if (worldError || countryError || historicalError) {
    return <div className="flex items-center justify-center h-screen text-2xl font-semibold text-red-600">An error occurred while fetching data. Please try again later.</div>;
  }

  const prepareChartData = (data: HistoricalData) => {
    return Object.keys(data.cases).map(date => ({
      date,
      cases: data.cases[date],
      deaths: data.deaths[date],
      recovered: data.recovered[date]
    }));
  };

  const chartData = historicalData ? prepareChartData(historicalData) : [];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">COVID-19 Dashboard</h1>
      
      {/* Worldwide Stats */}
      {worldData && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Worldwide Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow">
              <h3 className="font-medium text-blue-800">Total Cases</h3>
              <p className="text-3xl font-bold text-blue-900">{worldData.cases.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow">
              <h3 className="font-medium text-red-800">Total Deaths</h3>
              <p className="text-3xl font-bold text-red-900">{worldData.deaths.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow">
              <h3 className="font-medium text-green-800">Total Recovered</h3>
              <p className="text-3xl font-bold text-green-900">{worldData.recovered.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">COVID-19 Cases Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="deaths" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Map */}
      {countryData && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">COVID-19 World Map</h2>
          <div className="h-96 md:h-[500px] w-full rounded-lg overflow-hidden shadow-inner">
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {countryData.map((country) => (
                <Marker
                  key={country.country}
                  position={[country.countryInfo.lat, country.countryInfo.long]}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-bold text-lg mb-2">{country.country}</h3>
                      <p><span className="font-semibold">Total Cases:</span> {country.cases.toLocaleString()}</p>
                      <p><span className="font-semibold">Total Deaths:</span> {country.deaths.toLocaleString()}</p>
                      <p><span className="font-semibold">Total Recovered:</span> {country.recovered.toLocaleString()}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsAndMaps;