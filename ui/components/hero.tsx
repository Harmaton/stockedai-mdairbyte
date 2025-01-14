'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Database, Bot } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 bg-white text-center">
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
            <div className="flex flex-col gap-6 mb-8">
  {/* Users preview section */}
  <div className="flex items-center w-full  justify-center">
    <div className="flex -space-x-4">
      {/* User avatars - replace src with actual user images */}
      <Image 
        className="w-10 h-10 rounded-full border-2 border-white"
        src="/profiles/anna.jpg" 
        alt="User avatar"
        width={50}
        height={50}
      />
      <Image 
        className="w-10 h-10 rounded-full border-2 border-white"
        src="/profiles/lima.jpg" 
        alt="User avatar"
        width={50}
        height={50}
      />
      <Image 
        className="w-10 h-10 rounded-full border-2 border-white"
        src="/profiles/ketut.jpg" 
        alt="User avatar"
        width={50}
        height={50}
      />
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-gray-100 text-sm font-medium">
        +2k
      </div>
    </div>
    
    {/* Rating and user count */}
    <div className="ml-4 ">
      <div className="flex items-center gap-1">
        <span className="text-yellow-400">★★★★★</span>
        <span className="font-medium">4.9</span>
      </div>
      <p className="text-sm text-gray-600">
        from 2,000+ active analysts
      </p>
    </div>
  </div>

  {/* CTA Button */}
 <Link href='/dashboard' className='w-full flex justify-center'>
  <Button
    className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg
               hover:bg-blue-400 hover:shadow-xl transform hover:-translate-y-0.5
               transition-all duration-300 font-semibold w-3/4 max-w-2xl
               focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Join 2,000+ Analysts Today
  </Button>
</Link>
</div>
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

