import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata = {
  title: 'Payload Blank Template',
  description: 'A blank template using Payload in a Next.js app.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />

        {/*  max-width + padding → contenu bien centré sur mobile et desktop  */}
        <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
