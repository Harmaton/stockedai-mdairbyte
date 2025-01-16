'use client';

import { ArrowRightIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Connection {
  connectionId: string;
  name: string;
  sourceId: string;
  destinationId: string;
  workspaceId: string;
  status: string;
  schedule: {
    scheduleType: string;
    basicTiming: string;
  };
  createdAt: number;
}

export default function Page() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/airbyte/list_connections');
        const data = await response.json();

        // Filter connections related to Motherduck
        const motherduckConnections = data.data.data.filter(
          (connection: Connection) =>
            connection.destinationId === '4afa940f-1443-4e44-89d4-1d1653b1994e'
        );

        setConnections(motherduckConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleSync = (index: number) => {
    setConnections((prev) =>
      prev.map((connection, i) =>
        i === index ? { ...connection, status: 'syncing' } : connection
      )
    );

    // Simulate sync delay
    setTimeout(() => {
      setConnections((prev) =>
        prev.map((connection, i) =>
          i === index ? { ...connection, status: 'active' } : connection
        )
      );
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading connections...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <header className="bg-blue-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Connections to Motherduck</h1>
          <p className="mt-2 text-lg">
            View and manage all connections from sources to Motherduck.
          </p>
        </div>
      </header>

      {/* Connections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {connections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection, index) => (
              <div
                key={connection.connectionId}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <h3 className="text-lg font-medium text-gray-800">{connection.name}</h3>
                <p className="text-sm text-gray-500 mt-2">Source ID: {connection.sourceId}</p>
                <div className="flex items-center mt-4">
                  <div className="flex-1 text-center">
                    <span className="text-gray-500">Source</span>
                  </div>
                  <ArrowRightIcon className="w-6 h-6 text-purple-600 mx-2" />
                  <div className="flex-1 text-center">
                    <span className="text-gray-500">Motherduck</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Schedule: {connection.schedule.scheduleType} - {connection.schedule.basicTiming}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => handleSync(index)}
                    disabled={connection.status === 'syncing'}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                      connection.status === 'syncing'
                        ? 'bg-gray-400'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {connection.status === 'syncing' ? 'Syncing...' : 'Run Sync'}
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Status: {connection.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No connections found for Motherduck.</p>
        )}
      </div>
    </div>
  );
}
