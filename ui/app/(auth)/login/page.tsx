'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/google/callback', {
        method: 'GET'
      })

      if (response.ok) {
        const data = await response.json()
        // Assuming the backend returns a URL to redirect to
        router.push(data.redirectUrl)
      } else {
        console.error('Google login failed')
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error during Google login:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Logging in...' : 'Login with Google'}
        </Button>
      </div>
    </div>
  )
}

