import React from 'react';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WorldHistoricalData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

const fetchWorldHistoricalData = async (): Promise<WorldHistoricalData> => {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return response.json();
};

const Charts: React.FC = () => {
  const { data: worldHistoricalData, isLoading } = useQuery<WorldHistoricalData>('worldHistoricalData', fetchWorldHistoricalData);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const dates = worldHistoricalData ? Object.keys(worldHistoricalData.cases) : [];
  const casesData = worldHistoricalData ? Object.values(worldHistoricalData.cases) : [];

  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'COVID-19 Cases',
        data: casesData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'COVID-19 Cases Fluctuations'
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">COVID-19 Case Fluctuations</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default Charts;