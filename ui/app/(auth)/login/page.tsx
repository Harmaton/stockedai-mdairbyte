'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Header from '@/components/header'
export default function LoginPage() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const backend_url = 'http://localhost:3001/api/auth/google'
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${backend_url}`, {
        method: 'GET'
      })

      console.log(response)

      if (response.ok) {
        const data = await response.json()
        router.push(data.redirectUrl)
      } else {
        console.error('Google login failed')
      }
    } catch (error) {
      console.error('Error during Google login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Image */}
        <div className="hidden lg:block relative bg-blue-500">
          <div className="absolute inset-0 bg-blue-600/30" />
          <div className="absolute bottom-10 text-center left-0 p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Analytics Platform</h2>
            <p className="text-lg">Join thousands of analysts making data-driven decisions</p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
              <p className="text-gray-500">Sign in to continue to your dashboard</p>
            </div>

            <div className="mt-8 space-y-6">
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4
                         border border-gray-300 rounded-lg shadow-sm
                         transition duration-150 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Button>

              <div className="text-center text-sm text-gray-500">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}