import './globals.css'

import { Inter, Playfair_Display } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ThemeProvider } from 'next-themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Adit Whorra — ML Researcher & AI Scientist',
  description:
    'Adit Whorra is an AI researcher and engineer building machine learning systems for social impact — from Indic speech models to climate equity frameworks. MSc from TU Delft, currently at Wadhwani AI.',
  keywords: [
    'Adit Whorra',
    'ML Researcher',
    'AI Scientist',
    'Wadhwani AI',
    'TU Delft',
    'Indic Languages ASR',
    'Climate AI',
    'Graph ML',
  ],
  authors: [{ name: 'Adit Whorra' }],
  openGraph: {
    title: 'Adit Whorra — AI Researcher',
    description:
      'Building AI systems that create real-world impact.',
    type: 'website',
    url: 'https://aditwhorra42.github.io/portfolio',
    images: [
      {
        url: 'https://aditwhorra42.github.io/portfolio/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Adit Whorra — ML Researcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adit Whorra — AI Researcher',
    description:
      'Building AI systems that create real-world change.',
    images: ['https://aditwhorra42.github.io/portfolio/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
