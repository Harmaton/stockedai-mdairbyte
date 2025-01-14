'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {  Search } from 'lucide-react'
import { Button } from './ui/button'

const stocks = [
  { id: 1, name: 'Apple', symbol: 'AAPL', price: 185.92, change: 2.46 },
  { id: 2, name: 'Microsoft', symbol: 'MSFT', price: 389.47, change: 1.78 },
  { id: 3, name: 'Tesla', symbol: 'TSLA', price: 237.49, change: -0.62 },
  { id: 4, name: 'Amazon', symbol: 'AMZN', price: 155.34, change: 1.23 },
  { id: 5, name: 'Nvidia', symbol: 'NVDA', price: 547.10, change: 3.45 },
  { id: 6, name: 'Bitcoin', symbol: 'BTC', price: 43250.0, change: -1.87 }
]

const opportunities = [
  { id: 1, name: 'Apple', symbol: 'AAPL', action: 'Buy', reason: 'Oversold condition' },
  { id: 2, name: 'Tesla', symbol: 'TSLA', action: 'Sell', reason: 'Overbought condition' },
  { id: 3, name: 'Bitcoin', symbol: 'BTC', action: 'Hold', reason: 'Consolidating' }
]

type Stock = {
  id: number
  name: string
  symbol: string
  price: number
  change: number
}

type Opportunity = {
  id: number
  name: string
  symbol: string
  action: string
  reason: string
}

type Item = Stock | Opportunity

export default function StockCards() {
  const [activeTab, setActiveTab] = useState('top-gainers')
  const [stockData, setStockData] = useState<Stock[]>(stocks)

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(stocks.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5)
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const filteredStocks = (): Item[] => {
    switch (activeTab) {
      case 'top-gainers':
        return stockData.filter(stock => stock.change > 0).sort((a, b) => b.change - a.change).slice(0, 3)
      case 'top-losers':
        return stockData.filter(stock => stock.change < 0).sort((a, b) => a.change - b.change).slice(0, 3)
      case 'current-opportunities':
        return opportunities
      default:
        return stockData
    }
  }

  const isStock = (item: Item): item is Stock => 'price' in item && 'change' in item

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Explore top opportunities in real time</h2>
          <p className="text-xl text-gray-600">Stay ahead of the market with AI-powered insights.</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('top-gainers')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'top-gainers' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Top gainers
          </button>
          <button
            onClick={() => setActiveTab('top-losers')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'top-losers' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Top losers
          </button>
          <button
            onClick={() => setActiveTab('current-opportunities')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'current-opportunities' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Current opportunities
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStocks().map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.symbol}</p>
                </div>
                {isStock(item) ? (
                  <p className={`text-lg font-medium ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change).toFixed(2)}%
                  </p>
                ) : (
                  <p className={`text-lg font-medium ${
                    item.action === 'Buy' ? 'text-green-600' : item.action === 'Sell' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {item.action}
                  </p>
                )}
              </div>
              {isStock(item) ? (
                <p className="text-2xl font-bold mt-2">${item.price.toFixed(2)}</p>
              ) : (
                <p className="text-gray-600 mt-2">{item.reason}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Search className="h-8 w-8" />
            <h3 className="text-2xl font-bold">look before you leap</h3>
          </div>
          <p className="text-xl mb-6">
            Our AI-powered analysis helps you make informed decisions. Don&apos;t just follow the crowd - understand the market dynamics before making your move.
          </p>
          
          <Button className="bg-white text-blue-600 mr-2 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Start analyzing Stocks
          </Button>
          <Button className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Analyze your Portfolio
          </Button>
        
        </div>
      </div>
    </section>
  )
}
