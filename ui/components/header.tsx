'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChartBar, Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header 
      className="bg-white py-4 border-b"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
        <ChartBar className="h-8 w-8" />
        <span className="text-xl font-semibold text-blue-600">Stocked AI</span>
        </Link>
        <nav className="hidden md:block">
  <ul className="flex items-center gap-8">
    <li>
      <Link 
        href="#features" 
        className="text-gray-500 hover:text-blue-400 transition-all duration-300 font-medium"
      >
        Learn
      </Link>
    </li>
    <li>
      <Link 
        href="#" 
        className="text-gray-500 hover:text-blue-400 transition-all duration-300 font-medium"
      >
        Pricing
      </Link>
    </li>
    <li>
      <Link 
        href="#" 
        className="text-gray-500 hover:text-blue-400 transition-all duration-300 font-medium"
      >
        Advanced tools
      </Link>
    </li>
    <li>
    <Link href={'/dashboard'}>
      <Button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium
                 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5
                 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start Analyzing Today
      </Button>
     </Link>
    </li>
  </ul>
</nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.nav 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link href="#features" className="hover:text-blue-200 transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-blue-200 transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-blue-200 transition-colors">About</Link></li>
            <Link href={'/dashboard'}>
            <Button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Analyzing Today
              </Button>
              </Link>
          </ul>
        </motion.nav>
      )}
    </motion.header>
  )
}

