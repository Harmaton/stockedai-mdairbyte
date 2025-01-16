'use client';

import React, { useState, useEffect } from 'react';

interface MotherDuckConfigRequest {
  motherduck_api_key?: string;
  destination_path?: string;
  schema?: string;
  destinationType?: string;
  workspaceId: string;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<'Tickers' | 'MotherDuck'>('Tickers');
  const [tickers, setTickers] = useState<{ ticker: string; connectionName: string }[]>([]);
  const [motherDuckConnected, setMotherDuckConnected] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<MotherDuckConfigRequest>({
    motherduck_api_key: '',
    destination_path: '',
    schema: '',
    destinationType: 'duckdb',
    workspaceId: '3aa3bde5-6b43-42d7-a462-ba250c8d08a1',
  });

  useEffect(() => {
    // Fetch tickers with connection names
    const fetchTickers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/airbyte/list_sources');
        const data = await response.json();
        const sources = data.data.data.map((source: any) => ({
          ticker: source.configuration.tickers || source.configuration.stocksTicker || 'N/A',
          connectionName: source.name,
        }));
        setTickers(sources);
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    };

    // Fetch MotherDuck destination status
    const fetchMotherDuck = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/airbyte/list_destinations');
        const data = await response.json();
        const motherDuck = data.data.data.find(
          (destination: any) => destination.name === 'destination-MotherDuck'
        );
        setMotherDuckConnected(!!motherDuck);
      } catch (error) {
        console.error('Error fetching MotherDuck status:', error);
      }
    };

    fetchTickers();
    fetchMotherDuck();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/airbyte/connect_destination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('MotherDuck connected successfully!');
        setMotherDuckConnected(true);
      } else {
        alert('Failed to connect MotherDuck.');
      }
    } catch (error) {
      console.error('Error connecting MotherDuck:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-8 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Manage Connections</h1>
          <p className="mt-2 text-lg">
            View and manage your tickers and MotherDuck destination connection.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('Tickers')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'Tickers'
                ? 'border-purple-600 text-purple-600 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Tickers
          </button>
          <button
            onClick={() => setActiveTab('MotherDuck')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === 'MotherDuck'
                ? 'border-purple-600 text-purple-600 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            MotherDuck
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'Tickers' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tickers.map((ticker, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md flex flex-col"
                >
                  <h3 className="text-lg font-medium text-gray-800">{ticker.ticker}</h3>
                  <p className="text-sm text-gray-500">{ticker.connectionName}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {motherDuckConnected ? (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">MotherDuck is connected!</h3>
                  <p className="text-sm">Your destination is ready for use.</p>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-800">Connect MotherDuck</h3>
                  <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">API Key</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={formData.motherduck_api_key}
                        onChange={(e) =>
                          setFormData({ ...formData, motherduck_api_key: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Destination Path
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={formData.destination_path}
                        onChange={(e) =>
                          setFormData({ ...formData, destination_path: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Schema</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={formData.schema}
                        onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700"
                    >
                      Connect
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
