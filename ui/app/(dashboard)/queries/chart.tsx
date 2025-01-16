import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData, LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

// Registering the necessary components
ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

interface StockData {
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
}

interface ChartComponentProps {
  data: StockData[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-600 italic">No data available to display.</p>;
  }

  // Extract labels and datasets
  const labels = data.map((_, index) => `Point ${index + 1}`);
  const openPrices = data.map((item) => item.open_price);
  const closePrices = data.map((item) => item.close_price);
  const highPrices = data.map((item) => item.high_price);
  const lowPrices = data.map((item) => item.low_price);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Open Price',
        data: openPrices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Close Price',
        data: closePrices,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'High Price',
        data: highPrices,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Low Price',
        data: lowPrices,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Use a valid position like 'top', 'center', etc.
      },
    },
    scales: {
      y: {
        type: 'linear', // Explicitly set the y-axis to linear scale
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Stock Prices Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
