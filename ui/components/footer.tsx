import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-blue-600">
              <span className="text-xl font-semibold">StockedAI</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Empowering investors with AI-driven stock analysis and insights.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Learn</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500">&copy; 2025 StockedAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

