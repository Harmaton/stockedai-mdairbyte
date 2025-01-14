'use client'

import { motion } from 'framer-motion'
import { Shield, Key, Database, Lock } from 'lucide-react'

export default function Compliance() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Built on Trust</h2>
          <p className="text-xl text-gray-600">use your own data to beat volatility</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Key className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Keys, Your Control</h3>
                <p className="text-gray-600">
                  Connect your own API keys for data sources and MotherDuck integration. We never store or handle your data directly - everything stays within your control and infrastructure.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Direct Integration</h3>
                <p className="text-gray-600">
                  Data flows directly between your MotherDuck instance and your chosen data sources. StockedAI provides the intelligence layer without ever touching your sensitive data.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-gray-600">
                  Our infrastructure and processes are fully GDPR compliant. We prioritize data protection and privacy in every aspect of our service.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">SOC 2 Certified</h3>
                <p className="text-gray-600">
                  We maintain SOC 2 Type 1 certification, demonstrating our commitment to security, availability, and confidentiality of our services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

