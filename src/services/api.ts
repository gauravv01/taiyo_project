import axios from 'axios';
import { WorldwideData, CountryData, HistoricalData } from '../types';

const baseUrl = 'https://disease.sh/v3/covid-19';

export const fetchWorldwideData = async (): Promise<WorldwideData> => {
  const response = await axios.get<WorldwideData>(`${baseUrl}/all`);
  return response.data;
};

export const fetchCountryData = async (): Promise<CountryData[]> => {
  const response = await axios.get<CountryData[]>(`${baseUrl}/countries`);
  return response.data;
};

export const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const response = await axios.get<HistoricalData>(`${baseUrl}/historical/all?lastdays=all`);
  return response.data;
};