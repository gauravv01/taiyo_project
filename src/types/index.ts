export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  export interface WorldwideData {
    cases: number;
    deaths: number;
    recovered: number;
    updated: number;
  }
  
  export interface CountryData {
    country: string;
    countryInfo: {
      lat: number;
      long: number;
    };
    cases: number;
    deaths: number;
    recovered: number;
    active: number;
  }
  
  export interface HistoricalData {
    cases: { [date: string]: number };
    deaths: { [date: string]: number };
    recovered: { [date: string]: number };
  }