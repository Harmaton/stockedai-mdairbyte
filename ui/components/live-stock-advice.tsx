'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

const stockData: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -1.2 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.15, change: 1.8 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: 0.7 },
]

interface StockTickerProps {
  stock: Stock
}

const StockTicker: React.FC<StockTickerProps> = ({ stock }) => {
  const [currentPrice, setCurrentPrice] = useState(stock.price)
  const [currentChange, setCurrentChange] = useState(stock.change)

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = currentPrice + (Math.random() - 0.5) * 2
      const newChange = ((newPrice - stock.price) / stock.price) * 100
      setCurrentPrice(newPrice)
      setCurrentChange(newChange)
    }, 3000)

    return () => clearInterval(interval)
  }, [currentPrice, stock.price])

  return (
    <motion.div
      className="bg-blue-600 rounded-lg p-4 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white">
        {stock.symbol} - {stock.name}
      </h3>
      <p className="text-2xl font-bold text-blue-100">${currentPrice.toFixed(2)}</p>
      <p className={`text-sm ${currentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {currentChange >= 0 ? '▲' : '▼'} {Math.abs(currentChange).toFixed(2)}%
      </p>
    </motion.div>
  )
}

const LiveStockAdvice: React.FC = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Live Stock Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stockData.map((stock) => (
            <StockTicker key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LiveStockAdvice
