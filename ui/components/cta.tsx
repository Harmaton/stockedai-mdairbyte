import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section  className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Take Control of Your Investments?
        </motion.h2>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Record your portfolio and let our AI help you optimize your investment strategy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#" 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors inline-block"
          >
            Record Your Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  )
}
