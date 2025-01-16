'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

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
  { id: 4, name: 'S&P 500', symbol: 'SPX', price: 4500.00, change: 1.20 },
];

export default function StockMonitor() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  const addNewCard = () => {
    const newStock: Stock = {
      id: stocks.length + 1,
      name: 'New Stock',
      symbol: `SYM${stocks.length + 1}`,
      price: parseFloat((Math.random() * 500).toFixed(2)),
      change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
    };
    setStocks([...stocks, newStock]);
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold mb-8">Monitor Your Stocks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stocks.map((stock) => (
            <motion.div
              key={stock.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
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

          {/* Add New Card */}
          <button
            onClick={addNewCard}
            className="flex flex-col justify-center items-center bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Plus className="h-10 w-10 text-gray-500" />
            <span className="mt-2 text-gray-500">Add New</span>
          </button>
        </div>
      </div>
    </section>
  );
}
