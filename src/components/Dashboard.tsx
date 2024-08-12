import React from 'react';
import { useQuery } from 'react-query';
import LineGraph from './LineGraph';
import Map from './Map';
import { fetchWorldwideData, fetchCountryData, fetchHistoricalData } from '../services/api';
import { WorldwideData, CountryData, HistoricalData } from '../types';

const Dashboard: React.FC = () => {
  const { data: worldData, isLoading: isLoadingWorld, error: worldError } = useQuery<WorldwideData, Error>('worldData', fetchWorldwideData);
  const { data: countryData, isLoading: isLoadingCountry, error: countryError } = useQuery<CountryData[], Error>('countryData', fetchCountryData);
  const { data: historicalData, isLoading: isLoadingHistorical, error: historicalError } = useQuery<HistoricalData, Error>('historicalData', fetchHistoricalData);

  if (isLoadingWorld || isLoadingCountry || isLoadingHistorical) {
    return <div className="text-center">Loading...</div>;
  }

  if (worldError || countryError || historicalError) {
    return <div className="text-center text-red-500">An error occurred while fetching data.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">COVID-19 Cases Fluctuations</h2>
        {historicalData && <LineGraph data={historicalData} />}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">COVID-19 World Map</h2>
        {countryData && <Map data={countryData} />}
      </div>
      {worldData && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Worldwide COVID-19 Stats</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Cases</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{worldData.cases.toLocaleString()}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Deaths</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{worldData.deaths.toLocaleString()}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Recovered</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{worldData.recovered.toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export { Dashboard };
export default Dashboard;