'use client'
import Compliance from "@/components/compliance"
import CTA from "@/components/cta"
import Features from "@/components/features"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Hero from "@/components/hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
        <Compliance />
      </main>
      <Footer />
    </div>
  )
}

