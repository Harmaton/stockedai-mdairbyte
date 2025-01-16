'use client'

import React, { useState } from 'react';
import ChartComponent from './chart';


export default function Page() {
  const [activeTab, setActiveTab] = useState<'SQL' | 'Natural Language'>('SQL');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  // Function to handle query submission
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let apiUrl = '';
      if (activeTab === 'SQL') {
        apiUrl = 'http://localhost:3001/api/motherduck/run_query';
      } else {
        apiUrl = 'http://localhost:3001/api/motherduck/run_ai_query';
      }

      // Send the query to the appropriate endpoint
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2)); // Format the response for display
      } else {
        setResponse('Error: Failed to execute query.');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      setResponse('Error: Something went wrong.');
    }

    setQuery(''); // Clear the input field after submitting
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-8 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Query Interface</h1>
          <p className="mt-2 text-lg">Choose your preferred query method: SQL or Natural Language.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('SQL')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'SQL'
                ? 'border-purple-600 text-purple-600 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            SQL Query
          </button>
          <button
            onClick={() => setActiveTab('Natural Language')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === 'Natural Language'
                ? 'border-purple-600 text-purple-600 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Natural Language Query
          </button>
        </div>

        {/* Query Form */}
        <div className="mt-6">
          <form onSubmit={handleQuerySubmit}>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              {activeTab === 'SQL' ? 'Enter your SQL query:' : 'Describe your query in natural language:'}
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder={activeTab === 'SQL' ? 'SELECT * FROM table_name;' : 'Find all users who joined last month.'}
              required
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
            >
              Submit Query
            </button>
          </form>
        </div>

{/* Response Area */}
<div className="mt-8 bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded-lg shadow-lg p-6">
  <h2 className="text-lg font-extrabold text-gray-800 mb-4">Response</h2>
  <div className="mt-4 text-sm">
    {response ? (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg shadow-inner overflow-auto max-h-96 border border-gray-700">
        <code className="text-sm leading-relaxed">
          {JSON.stringify(response, null, 2)}
        </code>
        <ChartComponent data={Array.isArray(response) ? response : JSON.parse(response)} />
      </pre>
    ) : (
      <p className="text-gray-600 italic">No query submitted yet.</p>
    )}
  </div>
</div>


      </div>
    </div>
  );
}
