'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Database, Bot } from 'lucide-react'

export default function Hero() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The future of AI-powered stock analysis is here
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              StockedAI is the most trusted platform for investors and financial advisors to analyze, trade, and manage stocks with cutting-edge AI technology.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Database className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Multi-Source Data</h2>
              <p className="text-gray-600">Aggregate stock data from various sources for comprehensive analysis.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Bot className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">AI-Powered SQL</h2>
              <p className="text-gray-600">Use natural language to generate SQL queries for deep stock insights.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg col-span-full">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Investment Advisory</h2>
              <p className="text-gray-600">Receive AI-generated investment advice tailored to your financial goals and risk tolerance.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

