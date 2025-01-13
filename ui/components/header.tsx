'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChartBar, Menu, X } from 'lucide-react'

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
        <span className="text-xl font-semibold text-blue-500">StockedAI</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="#features" className="hover:text-blue-200 transition-colors">Learn</Link></li>
            <li><Link href="#" className="hover:text-blue-200 transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-blue-200 transition-colors">Advanced tools</Link></li>
            <li><Link href="#cta" className="bg-blue-500 hover:bg-black text-white px-4 py-2 rounded transition-colors">Get Started</Link></li>
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
            <li><Link href="#cta" className="bg-blue-500 hover:bg-black text-white px-4 py-2 rounded transition-colors">Get Started</Link></li>
          </ul>
        </motion.nav>
      )}
    </motion.header>
  )
}

