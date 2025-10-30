import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VeraLex Blog - Insights & Updates',
  description: 'Stories, guides, and thoughts on making legal services more accessible for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold">
                Vera<span className="text-primary">Lex</span> Blog
              </Link>
              <a
                href="http://localhost:5173"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to VeraLex
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-600">
              © 2025 VeraLex. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}