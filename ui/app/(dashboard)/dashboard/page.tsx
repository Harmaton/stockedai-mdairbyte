'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ChartComponent from '../queries/chart';


type Stock = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change: number;
};

const initialStocks: Stock[] = [
  { id: 1, name: 'Apple', symbol: 'AAPL', price: 185.92, change: 2.46 },
  { id: 2, name: 'Microsoft', symbol: 'MSFT', price: 389.47, change: 1.78 },
  { id: 3, name: 'Nvidia', symbol: 'NVDA', price: 547.10, change: 3.45 },
  { id: 4, name: 'S&P 500', symbol: 'SPX', price: 4500.0, change: 1.2 },
];

export default function Page() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [activeTab, setActiveTab] = useState<'Monitor' | 'Analysis'>('Monitor');
  const [analysisData, setAnalysisData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queries = {
    query1: `
      SELECT 
        (_airbyte_data->>'o')::NUMERIC AS open_price,
        (_airbyte_data->>'c')::NUMERIC AS close_price,
        (_airbyte_data->>'h')::NUMERIC AS high_price,
        (_airbyte_data->>'l')::NUMERIC AS low_price
      FROM 
        my_db._airbyte_raw_stock_api
      LIMIT 20;
    `,
    query2: `
      SELECT 
        (_airbyte_data->>'o')::NUMERIC AS open_price,
        (_airbyte_data->>'c')::NUMERIC AS close_price,
        (_airbyte_data->>'h')::NUMERIC AS high_price,
        (_airbyte_data->>'l')::NUMERIC AS low_price,
        ((_airbyte_data->>'c')::NUMERIC - (_airbyte_data->>'o')::NUMERIC) AS price_change,
        ROUND(((_airbyte_data->>'c')::NUMERIC - (_airbyte_data->>'o')::NUMERIC) / (_airbyte_data->>'o')::NUMERIC * 100, 2) AS percent_change
      FROM 
        my_db._airbyte_raw_stock_api
      ORDER BY 
        percent_change DESC
      LIMIT 20;
    `,
    query3: `
      SELECT 
        (_airbyte_data->>'h')::NUMERIC AS highest_price,
        (_airbyte_data->>'l')::NUMERIC AS lowest_price,
        (_airbyte_data->>'o')::NUMERIC AS open_price,
        (_airbyte_data->>'c')::NUMERIC AS close_price
      FROM 
        my_db._airbyte_raw_stock_api
      ORDER BY 
        highest_price DESC
      LIMIT 20;
    `,
  };

  const fetchAnalysisData = async () => {
    setLoading(true);
    setError(null);
    try {
      const results: Record<string, any> = {};
      for (const [key, query] of Object.entries(queries)) {
        const response = await fetch('http://localhost:3001/api/motherduck/run_query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${key}`);
        }

        const data = await response.json();
        results[key] = data;
      }
      setAnalysisData(results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch analysis data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-8 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Stock Analysis</h1>
          <p className="mt-2 text-lg">Monitor daily stocks or analyze trends and patterns.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('Monitor')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'Monitor'
                ? 'border-purple-600 text-purple-600 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Daily Monitor
          </button>
          <button
            onClick={() => {
              setActiveTab('Analysis');
              fetchAnalysisData();
            }}
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === 'Analysis'
                ? 'border-purple-600 text-purple-600 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Analysis
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'Monitor' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {stocks.map((stock) => (
                <motion.div
                  key={stock.id}
                  className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                    stock.symbol === 'MSFT' ? 'border-2 border-blue-500' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{stock.name}</h3>
                      <p className="text-gray-500">{stock.symbol}</p>
                    </div>
                    <p
                      className={`text-lg font-medium ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.change).toFixed(2)}%
                    </p>
                  </div>
                  <p className="text-2xl font-bold mt-2">${stock.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold text-gray-800">Close Analysis</h2>
              {loading ? (
                <p className="text-gray-600 italic">Performing Analysis ...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div>
                  {Object.entries(analysisData).map(([key, data]) => (
                    <div key={key} className="mt-6">
                      <h3 className="text-md font-semibold text-gray-700">
                        {key === 'query1'
                          ? 'Basic Price Data'
                          : key === 'query2'
                          ? 'Price Change Analysis'
                          : 'Highest Price Data'}
                      </h3>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg shadow-inner overflow-auto max-h-96 border border-gray-700">
                        <code className="text-sm leading-relaxed">
                          {JSON.stringify(data, null, 2)}
                        </code>
                      </div>
                      <ChartComponent
                        data={Array.isArray(data) ? data : JSON.parse(JSON.stringify(data))}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
